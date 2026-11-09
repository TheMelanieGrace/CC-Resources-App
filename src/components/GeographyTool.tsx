import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Printer, Map, CheckSquare, Square, PenTool, Compass, RefreshCw, AlertCircle } from 'lucide-react';
import * as topojson from 'topojson-client';
import { geoPath } from 'd3-geo';
import { REGIONS, STATE_NAME_MAP, STATE_METADATA, StateInfo } from '../data/usGeographyData';
import { RegionKey } from '../types';
import { getGuideSizeConfig } from '../utils/tracingWrap';
import { AskAiHelper } from './AskAiHelper';
import { printWorksheetPages } from '../utils/printHelper';

const TOPOJSON_CDN_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json';
const TOPOJSON_LOCAL_URL = '/data/states-albers-10m.json';

interface GeographyToolProps {
  onBack: () => void;
  onAddToWorksheet?: (lines: string[], questionTitle?: string) => void;
}

interface RenderableState {
  name: string;
  abbr: string;
  pathD: string;
  centroid: [number, number];
  capital: string;
  capitalProjected: [number, number];
  bounds: [[number, number], [number, number]];
  fontSize: number;
  labelOffset: [number, number];
  capitalLabelOffset: [number, number];
}

export const GeographyTool: React.FC<GeographyToolProps> = ({ onBack, onAddToWorksheet }) => {
  // Default to 'east' so user immediately sees the East Coast map
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>('east');
  const [showStudyMap, setShowStudyMap] = useState<boolean>(true);
  const [showTracingMap, setShowTracingMap] = useState<boolean>(true);
  const [showCopywork, setShowCopywork] = useState<boolean>(true);
  const [showMemoryBox, setShowMemoryBox] = useState<boolean>(true);
  const [includeBlankLine, setIncludeBlankLine] = useState<boolean>(false);
  const [headerNameDate, setHeaderNameDate] = useState<boolean>(true);

  // TopoJSON state
  const [topology, setTopology] = useState<any | null>(null);
  const [isLoadingTopology, setIsLoadingTopology] = useState<boolean>(true);
  const [topoError, setTopoError] = useState<string | null>(null);

  // Load TopoJSON from CDN with local fallback
  useEffect(() => {
    let isMounted = true;
    async function loadTopo() {
      setIsLoadingTopology(true);
      setTopoError(null);
      try {
        let res = await fetch(TOPOJSON_CDN_URL);
        if (!res.ok) {
          res = await fetch(TOPOJSON_LOCAL_URL);
        }
        if (!res.ok) {
          throw new Error('Failed to load standard US TopoJSON map data');
        }
        const data = await res.json();
        if (isMounted) {
          setTopology(data);
          setIsLoadingTopology(false);
        }
      } catch (err: any) {
        console.warn('CDN fetch failed, trying local backup:', err);
        try {
          const resLocal = await fetch(TOPOJSON_LOCAL_URL);
          if (!resLocal.ok) throw new Error('Local TopoJSON file not available');
          const dataLocal = await resLocal.json();
          if (isMounted) {
            setTopology(dataLocal);
            setIsLoadingTopology(false);
          }
        } catch (localErr: any) {
          if (isMounted) {
            setTopoError('Could not load US atlas boundary data. Please check your network connection.');
            setIsLoadingTopology(false);
          }
        }
      }
    }
    loadTopo();
    return () => {
      isMounted = false;
    };
  }, []);

  const regionInfo = REGIONS[selectedRegion];

  // Convert TopoJSON features into renderable state objects using d3-geo
  const { allRenderableStates, activeRegionStates, viewBox } = useMemo(() => {
    if (!topology || !topology.objects || !topology.objects.states) {
      return { allRenderableStates: [], activeRegionStates: [], viewBox: '0 0 975 610' };
    }

    const pathGen = geoPath();
    const stateFeaturesCollection = topojson.feature(topology, topology.objects.states) as any;
    const features: any[] = stateFeaturesCollection.features || [];

    const states: RenderableState[] = [];
    for (const feat of features) {
      const stateName = feat.properties?.name;
      const meta: StateInfo | undefined = STATE_NAME_MAP[stateName];
      if (!meta) continue;

      const pathD = pathGen(feat) || '';
      const centroid = pathGen.centroid(feat) as [number, number];
      const bounds = pathGen.bounds(feat) as [[number, number], [number, number]];

      states.push({
        name: meta.name,
        abbr: meta.abbr,
        pathD,
        centroid,
        capital: meta.capital,
        capitalProjected: meta.capitalProjected,
        bounds,
        fontSize: meta.fontSize || 10,
        labelOffset: meta.labelOffset || [0, 0],
        capitalLabelOffset: meta.capitalLabelOffset || [6, 2],
      });
    }

    // Filter states for active region
    const activeStates = states.filter((st) => regionInfo.stateNames.includes(st.name));

    // Compute bounding box for the active region to fit the visible area perfectly
    if (activeStates.length > 0) {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      for (const st of activeStates) {
        const [[x0, y0], [x1, y1]] = st.bounds;
        if (x0 < minX) minX = x0;
        if (y0 < minY) minY = y0;
        if (x1 > maxX) maxX = x1;
        if (y1 > maxY) maxY = y1;
      }

      // Add generous padding around the region
      const pad = 16;
      const width = maxX - minX + 2 * pad;
      const height = maxY - minY + 2 * pad;
      const computedViewBox = `${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${width.toFixed(1)} ${height.toFixed(1)}`;

      return {
        allRenderableStates: states,
        activeRegionStates: activeStates,
        viewBox: computedViewBox,
      };
    }

    return {
      allRenderableStates: states,
      activeRegionStates: states,
      viewBox: '0 0 975 610',
    };
  }, [topology, selectedRegion]);

  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [printBlockedNotice, setPrintBlockedNotice] = useState<string | null>(null);

  const handlePrint = async () => {
    setIsPrinting(true);
    setPrintBlockedNotice(null);

    try {
      const pageElements = document.querySelectorAll('.print-page');
      const pagesHtml: string[] = [];
      pageElements.forEach((el) => {
        const clone = el.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('.no-print').forEach((n) => n.remove());
        pagesHtml.push(clone.innerHTML);
      });

      if (pagesHtml.length === 0) {
        window.print();
        return;
      }

      await printWorksheetPages({
        pagesHtml,
        docTitle: `${regionInfo.name} Geography Study Pages`,
        onBlockedNotice: (msg) => setPrintBlockedNotice(msg),
      });
    } catch (err) {
      console.error('[Geography Print Error]:', err);
    } finally {
      setIsPrinting(false);
    }
  };

  // Guide line geometry for copywork section
  const copyworkCfg = getGuideSizeConfig('medium', 'print');

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Print Blocked Friendly Warning Banner */}
      {printBlockedNotice && (
        <div className="mb-4 bg-amber-50 border border-amber-300 rounded-xl p-3.5 flex items-start justify-between shadow-xs no-print text-amber-900 text-xs">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Printing Notice</span>
              <span>{printBlockedNotice}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setPrintBlockedNotice(null)}
            className="text-amber-700 hover:text-amber-950 p-1 cursor-pointer"
            title="Dismiss"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Bar */}
      <div className="no-print flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[#2F5D50] hover:text-[#24493e] font-semibold text-sm transition-colors py-1 px-2 rounded-md hover:bg-[#E4EDE7] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Tools</span>
        </button>

        <button
          onClick={handlePrint}
          disabled={isPrinting}
          className="inline-flex items-center gap-1.5 bg-[#2F5D50] hover:bg-[#24493e] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
        >
          {isPrinting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Preparing print...</span>
            </>
          ) : (
            <>
              <Printer className="w-4 h-4" />
              <span>Print Study Packet</span>
            </>
          )}
        </button>
      </div>

      {/* Controls Card */}
      <div className="no-print bg-[#FFFFFF] border border-[#D5DED8] rounded-xl p-6 shadow-xs mb-8 space-y-5">
        <div>
          <h2 className="text-xl font-bold text-[#2E2B26]">US Geography Study Pages</h2>
          <p className="text-xs text-[#5C6B62] mt-1">
            Real US Census boundaries loaded from TopoJSON. Fully touching shared borders, true capital locations, and printable cartography exercises.
          </p>
        </div>

        {/* Region Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#2E2B26] mb-2">
            Select Study Region
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {(Object.keys(REGIONS) as RegionKey[]).map((key) => {
              const reg = REGIONS[key];
              const isSelected = selectedRegion === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedRegion(key)}
                  className={`px-3 py-2 rounded-lg text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#2F5D50] text-white border-[#2F5D50] shadow-xs'
                      : 'bg-white text-[#2E2B26] border-[#C2CFC6] hover:bg-[#E4EDE7]'
                  }`}
                >
                  <div className="text-xs font-bold">{reg.name}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#5C6B62]'}`}>
                    {reg.abbrs ? `${reg.abbrs.length} states` : '50 states'}
                  </div>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-[#5C6B62] mt-2 italic">
            {regionInfo.description}
          </p>
        </div>

        {/* Section Toggles */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#2E2B26] mb-2">
            Packet Sections to Include
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <button
              type="button"
              onClick={() => setShowStudyMap(!showStudyMap)}
              className="flex items-center gap-2 text-[#2E2B26] hover:text-[#2F5D50] text-left cursor-pointer"
            >
              {showStudyMap ? (
                <CheckSquare className="w-4 h-4 text-[#2F5D50]" />
              ) : (
                <Square className="w-4 h-4 text-[#C2CFC6]" />
              )}
              <span>Labeled Study Map</span>
            </button>

            <button
              type="button"
              onClick={() => setShowTracingMap(!showTracingMap)}
              className="flex items-center gap-2 text-[#2E2B26] hover:text-[#2F5D50] text-left cursor-pointer"
            >
              {showTracingMap ? (
                <CheckSquare className="w-4 h-4 text-[#2F5D50]" />
              ) : (
                <Square className="w-4 h-4 text-[#C2CFC6]" />
              )}
              <span>Dotted Tracing Map</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCopywork(!showCopywork)}
              className="flex items-center gap-2 text-[#2E2B26] hover:text-[#2F5D50] text-left cursor-pointer"
            >
              {showCopywork ? (
                <CheckSquare className="w-4 h-4 text-[#2F5D50]" />
              ) : (
                <Square className="w-4 h-4 text-[#C2CFC6]" />
              )}
              <span>State & Capital Copywork</span>
            </button>

            <button
              type="button"
              onClick={() => setShowMemoryBox(!showMemoryBox)}
              className="flex items-center gap-2 text-[#2E2B26] hover:text-[#2F5D50] text-left cursor-pointer"
            >
              {showMemoryBox ? (
                <CheckSquare className="w-4 h-4 text-[#2F5D50]" />
              ) : (
                <Square className="w-4 h-4 text-[#C2CFC6]" />
              )}
              <span>"Draw from Memory" Box</span>
            </button>

            <button
              type="button"
              onClick={() => setIncludeBlankLine(!includeBlankLine)}
              className="flex items-center gap-2 text-[#2E2B26] hover:text-[#2F5D50] text-left cursor-pointer"
            >
              {includeBlankLine ? (
                <CheckSquare className="w-4 h-4 text-[#2F5D50]" />
              ) : (
                <Square className="w-4 h-4 text-[#C2CFC6]" />
              )}
              <span>Blank Line below Copywork</span>
            </button>

            <button
              type="button"
              onClick={() => setHeaderNameDate(!headerNameDate)}
              className="flex items-center gap-2 text-[#2E2B26] hover:text-[#2F5D50] text-left cursor-pointer"
            >
              {headerNameDate ? (
                <CheckSquare className="w-4 h-4 text-[#2F5D50]" />
              ) : (
                <Square className="w-4 h-4 text-[#C2CFC6]" />
              )}
              <span>Name / Date Header</span>
            </button>
          </div>
        </div>

        {/* Ask AI Helper for Geography */}
        <AskAiHelper
          toolContext="geography"
          onAddLines={onAddToWorksheet}
          addButtonLabel="Add to Worksheet"
          placeholder='Ask geography questions (e.g. "mnemonic for Great Lakes", "how to remember New England capitals")...'
        />
      </div>

      {/* Loading / Error State */}
      {isLoadingTopology && (
        <div className="bg-[#FFFFFF] border border-[#D5DED8] rounded-xl p-10 text-center space-y-3 mb-6">
          <RefreshCw className="w-6 h-6 animate-spin text-[#2F5D50] mx-auto" />
          <p className="text-sm font-semibold text-[#2E2B26]">
            Loading real US Census cartographic boundary data...
          </p>
        </div>
      )}

      {topoError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm flex items-center gap-2 mb-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{topoError}</span>
        </div>
      )}

      {/* Printable Packet Container */}
      {!isLoadingTopology && (
        <div className="space-y-10">
          {/* SECTION 1: Labeled Study Map */}
          {showStudyMap && (
            <div className="bg-white text-[#2E2B26] p-6 sm:p-8 rounded-xl shadow-md border border-[#D5DED8] print-page">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2 border-b-2 border-[#2E2B26] pb-3 mb-4">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#2E2B26]">
                    {regionInfo.name} — Cartography Study Map
                  </h3>
                  <div className="text-xs text-[#5C6B62]">
                    Classical Grammar Stage Geography • Standard US Census Boundaries ({activeRegionStates.length} states)
                  </div>
                </div>
                {headerNameDate && (
                  <div className="text-xs font-medium text-[#2E2B26] space-x-4 shrink-0">
                    <span>Name: ______________________</span>
                    <span>Date: ____________</span>
                  </div>
                )}
              </div>

              {/* SVG Map */}
              <div className="relative border border-[#E4EDE7] rounded-lg bg-[#FFFFFF] p-2 overflow-hidden">
                <svg
                  viewBox={viewBox}
                  className="w-full h-auto block"
                  style={{ maxHeight: '560px' }}
                >
                  <defs>
                    <filter id="soft-shadow" x="-5%" y="-5%" width="110%" height="110%">
                      <feDropShadow dx="0.5" dy="0.5" stdDeviation="0.5" floodColor="#7C8880" floodOpacity="0.25" />
                    </filter>
                  </defs>

                  {/* Render every state in the active region with real boundary path */}
                  <g className="states-layer">
                    {activeRegionStates.map((st) => (
                      <path
                        key={st.abbr}
                        d={st.pathD}
                        fill="#F5EFE0"
                        stroke="#2E2B26"
                        strokeWidth={selectedRegion === 'us' ? 0.8 : 1.2}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className="transition-colors hover:fill-[#E4EDE7]"
                      >
                        <title>{`${st.name} (Capital: ${st.capital})`}</title>
                      </path>
                    ))}
                  </g>

                  {/* Render state abbreviation labels & true capital dots */}
                  <g className="labels-layer">
                    {activeRegionStates.map((st) => {
                      const lx = st.centroid[0] + st.labelOffset[0];
                      const ly = st.centroid[1] + st.labelOffset[1];
                      const kx = st.capitalProjected[0];
                      const ky = st.capitalProjected[1];
                      const capTextX = kx + st.capitalLabelOffset[0];
                      const capTextY = ky + st.capitalLabelOffset[1];

                      return (
                        <g key={`labels-${st.abbr}`}>
                          {/* Two-letter abbreviation inside state */}
                          <text
                            x={lx}
                            y={ly}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#2E2B26"
                            fontSize={st.fontSize}
                            fontWeight="800"
                            fontFamily="sans-serif"
                            letterSpacing="0.5px"
                          >
                            {st.abbr}
                          </text>

                          {/* Capital Star / Dot at true projected location */}
                          <circle
                            cx={kx}
                            cy={ky}
                            r={selectedRegion === 'us' ? 2.5 : 3.5}
                            fill="#2F5D50"
                            stroke="#FFFFFF"
                            strokeWidth="1"
                          />
                          <circle
                            cx={kx}
                            cy={ky}
                            r={selectedRegion === 'us' ? 1 : 1.3}
                            fill="#FFFFFF"
                          />

                          {/* Capital city name text (rendered for regional maps or clean sizing) */}
                          {selectedRegion !== 'us' && (
                            <text
                              x={capTextX}
                              y={capTextY}
                              fill="#2F5D50"
                              fontSize="8"
                              fontWeight="600"
                              fontFamily="sans-serif"
                            >
                              {st.capital}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </g>

                  {/* Map Legend */}
                  <g transform="translate(10, 10)">
                    <rect x="0" y="0" width="130" height="42" fill="#FFFFFF" fillOpacity="0.9" rx="4" stroke="#D5DED8" strokeWidth="0.8" />
                    <circle cx="12" cy="14" r="3.5" fill="#2F5D50" stroke="#FFFFFF" strokeWidth="1" />
                    <text x="22" y="17" fontSize="8" fontWeight="bold" fill="#2E2B26">★ Capital City</text>
                    <text x="12" y="32" fontSize="8" fontWeight="bold" fill="#2E2B26">XX = State Abbr.</text>
                  </g>
                </svg>
              </div>

              {/* Printed Worksheet Footer */}
              <div className="pt-4 pb-1 text-center text-[10px] sm:text-xs text-[#7C8880] whitespace-nowrap border-t border-[#E4EDE7] mt-4">
                Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
              </div>
            </div>
          )}

          {/* SECTION 2: Dotted Tracing Map */}
          {showTracingMap && (
            <div className="bg-white text-[#2E2B26] p-6 sm:p-8 rounded-xl shadow-md border border-[#D5DED8] print-page">
              <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2 border-b-2 border-[#2E2B26] pb-3 mb-4">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#2E2B26]">
                    {regionInfo.name} — Cartography Tracing Map
                  </h3>
                  <div className="text-xs text-[#5C6B62]">
                    Trace the state boundaries and label each state abbreviation and capital dot.
                  </div>
                </div>
                {headerNameDate && (
                  <div className="text-xs font-medium text-[#2E2B26] space-x-4 shrink-0">
                    <span>Name: ______________________</span>
                    <span>Date: ____________</span>
                  </div>
                )}
              </div>

              <div className="relative border border-[#E4EDE7] rounded-lg bg-white p-2 overflow-hidden">
                <svg
                  viewBox={viewBox}
                  className="w-full h-auto block"
                  style={{ maxHeight: '560px' }}
                >
                  {/* Tracing outline paths: dotted/dashed boundaries */}
                  <g className="tracing-states">
                    {activeRegionStates.map((st) => (
                      <path
                        key={`trace-${st.abbr}`}
                        d={st.pathD}
                        fill="#FFFFFF"
                        stroke="#8A8275"
                        strokeWidth="1.2"
                        strokeDasharray="4 3"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    ))}
                  </g>

                  {/* Dotted capital city locations for student marking */}
                  <g className="tracing-capitals">
                    {activeRegionStates.map((st) => (
                      <g key={`trace-cap-${st.abbr}`}>
                        <circle
                          cx={st.capitalProjected[0]}
                          cy={st.capitalProjected[1]}
                          r="3"
                          fill="none"
                          stroke="#7B7365"
                          strokeWidth="1.2"
                          strokeDasharray="2 2"
                        />
                        {/* Faint abbreviation watermark for tracing */}
                        <text
                          x={st.centroid[0] + st.labelOffset[0]}
                          y={st.centroid[1] + st.labelOffset[1]}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#B0A696"
                          fontSize={st.fontSize}
                          fontWeight="600"
                          fontFamily="sans-serif"
                        >
                          {st.abbr}
                        </text>
                      </g>
                    ))}
                  </g>
                </svg>
              </div>

              {/* Printed Worksheet Footer */}
              <div className="pt-4 pb-1 text-center text-[10px] sm:text-xs text-[#7C8880] whitespace-nowrap border-t border-[#E4EDE7] mt-4">
                Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
              </div>
            </div>
          )}

          {/* SECTION 3: State & Capital Copywork with Aligned Guide Lines */}
          {showCopywork && (
            <div className="bg-white text-[#2E2B26] p-6 sm:p-8 rounded-xl shadow-md border border-[#D5DED8] print-page">
              <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2 border-b-2 border-[#2E2B26] pb-3 mb-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#2E2B26]">
                    {regionInfo.name} — States & Capitals Copywork
                  </h3>
                  <div className="text-xs text-[#5C6B62]">
                    Trace and copy each state and capital on standard handwriting guidelines.
                  </div>
                </div>
                {headerNameDate && (
                  <div className="text-xs font-medium text-[#2E2B26] space-x-4 shrink-0">
                    <span>Name: ______________________</span>
                    <span>Date: ____________</span>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {activeRegionStates.map((st) => {
                  const lineText = `${st.name} — ${st.capital}`;
                  return (
                    <div key={`copy-${st.abbr}`} className="space-y-1">
                      {/* Model Sentence Text */}
                      <div className="flex items-baseline justify-between text-xs text-[#44514A]">
                        <span className="font-bold">{st.abbr}: {st.name}</span>
                        <span className="font-semibold text-[#2F5D50]">Capital: {st.capital}</span>
                      </div>

                      {/* Dotted Trace Guide Line */}
                      <div className="relative w-full">
                        <svg
                          viewBox={`0 0 ${copyworkCfg.svgWidth} ${copyworkCfg.rowHeight}`}
                          className="w-full h-auto block overflow-visible"
                          overflow="visible"
                          style={{ minHeight: `${copyworkCfg.rowHeight}px` }}
                        >
                          {/* Top Blue Line */}
                          <line x1="0" y1={copyworkCfg.topY} x2={copyworkCfg.svgWidth} y2={copyworkCfg.topY} stroke="#5A92C4" strokeWidth="1.5" />
                          {/* Midline Dashed Blue */}
                          <line x1="0" y1={copyworkCfg.midY} x2={copyworkCfg.svgWidth} y2={copyworkCfg.midY} stroke="#5A92C4" strokeWidth="1.2" strokeDasharray="6 5" />
                          {/* Baseline Solid Red */}
                          <line x1="0" y1={copyworkCfg.baseY} x2={copyworkCfg.svgWidth} y2={copyworkCfg.baseY} stroke="#D9534F" strokeWidth="1.8" />

                          {/* Trace text: Dotted hairline-thin weight 100 with light gray dashed stroke #9C948A */}
                          <text
                            x={copyworkCfg.startX}
                            y={copyworkCfg.baseY}
                            dominantBaseline="alphabetic"
                            fill="none"
                            stroke="#9C948A"
                            strokeWidth="1.5"
                            strokeDasharray="1 4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fontSize={copyworkCfg.fontSize}
                            fontFamily={copyworkCfg.fontFamily}
                            fontWeight={100}
                            letterSpacing="0.5px"
                          >
                            {lineText}
                          </text>
                        </svg>
                      </div>

                      {/* Blank Practice Line */}
                      {includeBlankLine && (
                        <div className="relative w-full pt-1">
                          <svg
                            viewBox={`0 0 ${copyworkCfg.svgWidth} ${copyworkCfg.rowHeight}`}
                            className="w-full h-auto block overflow-visible"
                            overflow="visible"
                            style={{ minHeight: `${copyworkCfg.rowHeight}px` }}
                          >
                            <line x1="0" y1={copyworkCfg.topY} x2={copyworkCfg.svgWidth} y2={copyworkCfg.topY} stroke="#5A92C4" strokeWidth="1.5" />
                            <line x1="0" y1={copyworkCfg.midY} x2={copyworkCfg.svgWidth} y2={copyworkCfg.midY} stroke="#5A92C4" strokeWidth="1.2" strokeDasharray="6 5" />
                            <line x1="0" y1={copyworkCfg.baseY} x2={copyworkCfg.svgWidth} y2={copyworkCfg.baseY} stroke="#D9534F" strokeWidth="1.8" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Printed Worksheet Footer */}
              <div className="pt-6 pb-1 text-center text-[10px] sm:text-xs text-[#7C8880] whitespace-nowrap border-t border-[#E4EDE7] mt-6">
                Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
              </div>
            </div>
          )}

          {/* SECTION 4: Draw from Memory Box */}
          {showMemoryBox && (
            <div className="bg-white text-[#2E2B26] p-6 sm:p-8 rounded-xl shadow-md border border-[#D5DED8] print-page">
              <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2 border-b-2 border-[#2E2B26] pb-3 mb-4">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#2E2B26]">
                    {regionInfo.name} — Draw from Memory
                  </h3>
                  <div className="text-xs text-[#5C6B62]">
                    Classical cartography practice: sketch the outline and state borders from memory, then label states and capitals.
                  </div>
                </div>
                {headerNameDate && (
                  <div className="text-xs font-medium text-[#2E2B26] space-x-4 shrink-0">
                    <span>Name: ______________________</span>
                    <span>Date: ____________</span>
                  </div>
                )}
              </div>

              {/* Drawing Grid & Box */}
              <div className="relative border-2 border-[#C2CFC6] rounded-xl h-[480px] bg-[#FFFFFF] p-4 flex flex-col justify-between">
                {/* Compass Rose */}
                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-lg border border-[#D5DED8] shadow-xs flex flex-col items-center">
                  <Compass className="w-8 h-8 text-[#2F5D50]" />
                  <span className="text-[10px] font-bold text-[#2E2B26] mt-0.5">N</span>
                </div>

                {/* Light dot grid watermark for drawing guidance */}
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'radial-gradient(#D5DED8 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                <div className="text-[11px] text-[#7C8880] italic text-center border-t border-[#E4EDE7] pt-2">
                  "Draw what you know, check against the model, and erase to improve." — Classical Grammar Stage Cartography
                </div>
              </div>

              {/* Printed Worksheet Footer */}
              <div className="pt-4 pb-1 text-center text-[10px] sm:text-xs text-[#7C8880] whitespace-nowrap border-t border-[#E4EDE7] mt-4">
                Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
