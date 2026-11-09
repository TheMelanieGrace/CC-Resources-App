import React from 'react';
import { LetterStyle } from '../types';
import { GuideSizeConfig } from '../utils/tracingWrap';
import { isPurePrompt } from '../utils/labelHelper';

export interface GuideLineSvgRowProps {
  text: string;
  mode: 'model' | 'trace' | 'blank';
  cfg: GuideSizeConfig;
  style: LetterStyle;
  traceStyle?: 'dotted' | 'gray';
}

/**
 * Single SVG guide-line row holding one piece of a sentence or a column item.
 * Strictly guarantees:
 * - Solid blue top line = capital-letter & tall ascender height
 * - Dashed blue middle line = exact halfway point between top line and baseline
 * - Solid red baseline = where all letter bases rest
 * - Josefin Sans / Playwrite US Trad font
 * - Hairline-thin weight 100 for dotted trace style (no bubble/hollow look)
 * - Reliable ending punctuation rendering
 * - Universal prompt rule: prompts are NEVER rendered on guide lines (model or trace)
 */
export const GuideLineSvgRow: React.FC<GuideLineSvgRowProps> = ({
  text,
  mode,
  cfg,
  style,
  traceStyle = 'dotted',
}) => {
  // If this is a model or trace row but text is empty or is a prompt, do not render on guide lines
  if (mode !== 'blank' && (!text || !text.trim() || isPurePrompt(text))) {
    return null;
  }

  const fontScale = cfg.fontSize / (style === 'print' ? 36 : 28);
  const strokeWidth = Math.max(0.85, Number((1.3 * fontScale).toFixed(2)));
  const dashLength = Math.max(0.8, Number((1.0 * fontScale).toFixed(2)));
  const gapLength = Math.max(2.8, Number((3.5 * fontScale).toFixed(2)));
  const topLineStroke = Math.max(1.0, Number((1.3 * fontScale).toFixed(2)));
  const midLineStroke = Math.max(0.85, Number((1.0 * fontScale).toFixed(2)));
  const baseLineStroke = Math.max(1.2, Number((1.5 * fontScale).toFixed(2)));
  const midDashArray = `${Math.max(4, Number((5 * fontScale).toFixed(1)))} ${Math.max(3, Number((4 * fontScale).toFixed(1)))}`;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${cfg.svgWidth} ${cfg.rowHeight}`}
        className="w-full h-auto block overflow-visible"
        overflow="visible"
        style={{ minHeight: `${cfg.rowHeight}px` }}
      >
        {/* Top guide line (solid blue): capital-letter & tall ascender height */}
        <line
          x1="0"
          y1={cfg.topY}
          x2={cfg.svgWidth}
          y2={cfg.topY}
          stroke="#5A92C4"
          strokeWidth={topLineStroke}
        />

        {/* Midline (dashed blue): exact 50% halfway line at measured x-height */}
        <line
          x1="0"
          y1={cfg.midY}
          x2={cfg.svgWidth}
          y2={cfg.midY}
          stroke="#5A92C4"
          strokeWidth={midLineStroke}
          strokeDasharray={midDashArray}
        />

        {/* Baseline (solid red): where all letter bases rest */}
        <line
          x1="0"
          y1={cfg.baseY}
          x2={cfg.svgWidth}
          y2={cfg.baseY}
          stroke="#D9534F"
          strokeWidth={baseLineStroke}
        />

        {/* Solid Model Text sitting on baseline (weight 500 for Josefin Sans) */}
        {text && mode === 'model' && (
          <text
            x={cfg.startX}
            y={cfg.baseY}
            dominantBaseline="alphabetic"
            fill="#2E2B26"
            stroke="none"
            fontSize={cfg.fontSize}
            fontFamily={cfg.fontFamily}
            fontWeight={style === 'print' ? 500 : 400}
          >
            {text}
          </text>
        )}

        {/* Dotted Trace Text: weight 100 with strokeDasharray */}
        {text && mode === 'trace' && traceStyle === 'dotted' && (
          <text
            x={cfg.startX}
            y={cfg.baseY}
            dominantBaseline="alphabetic"
            fill="none"
            stroke="#4A453E"
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLength} ${gapLength}`}
            strokeLinecap="round"
            fontSize={cfg.fontSize}
            fontFamily={cfg.fontFamily}
            fontWeight={100}
          >
            {text}
          </text>
        )}

        {/* Gray Letters Trace Text: subtle 30% black fill */}
        {text && mode === 'trace' && traceStyle === 'gray' && (
          <text
            x={cfg.startX}
            y={cfg.baseY}
            dominantBaseline="alphabetic"
            fill="#7C8880"
            stroke="none"
            fontSize={cfg.fontSize}
            fontFamily={cfg.fontFamily}
            fontWeight={style === 'print' ? 400 : 400}
            opacity={0.8}
          >
            {text}
          </text>
        )}
      </svg>
    </div>
  );
};
