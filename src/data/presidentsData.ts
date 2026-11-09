export interface PresidentEntry {
  order: number;
  president: string;
  vicePresidents: string;
  orderLabel: string;
  fullLine: string;
}

/**
 * Static verified list of U.S. Presidents and Vice Presidents verbatim.
 * Do not generate, add, or "correct" any names — use this list verbatim.
 */
export const PRESIDENTS_VERBATIM_LIST: readonly PresidentEntry[] = [
  {
    order: 1,
    president: 'George Washington',
    vicePresidents: 'John Adams',
    orderLabel: '1. George Washington',
    fullLine: '1. George Washington — John Adams',
  },
  {
    order: 2,
    president: 'John Adams',
    vicePresidents: 'Thomas Jefferson',
    orderLabel: '2. John Adams',
    fullLine: '2. John Adams — Thomas Jefferson',
  },
  {
    order: 3,
    president: 'Thomas Jefferson',
    vicePresidents: 'Aaron Burr, George Clinton',
    orderLabel: '3. Thomas Jefferson',
    fullLine: '3. Thomas Jefferson — Aaron Burr, George Clinton',
  },
  {
    order: 4,
    president: 'James Madison',
    vicePresidents: 'George Clinton, Elbridge Gerry',
    orderLabel: '4. James Madison',
    fullLine: '4. James Madison — George Clinton, Elbridge Gerry',
  },
  {
    order: 5,
    president: 'James Monroe',
    vicePresidents: 'Daniel D. Tompkins',
    orderLabel: '5. James Monroe',
    fullLine: '5. James Monroe — Daniel D. Tompkins',
  },
  {
    order: 6,
    president: 'John Quincy Adams',
    vicePresidents: 'John C. Calhoun',
    orderLabel: '6. John Quincy Adams',
    fullLine: '6. John Quincy Adams — John C. Calhoun',
  },
  {
    order: 7,
    president: 'Andrew Jackson',
    vicePresidents: 'John C. Calhoun, Martin Van Buren',
    orderLabel: '7. Andrew Jackson',
    fullLine: '7. Andrew Jackson — John C. Calhoun, Martin Van Buren',
  },
  {
    order: 8,
    president: 'Martin Van Buren',
    vicePresidents: 'Richard M. Johnson',
    orderLabel: '8. Martin Van Buren',
    fullLine: '8. Martin Van Buren — Richard M. Johnson',
  },
  {
    order: 9,
    president: 'William Henry Harrison',
    vicePresidents: 'John Tyler',
    orderLabel: '9. William Henry Harrison',
    fullLine: '9. William Henry Harrison — John Tyler',
  },
  {
    order: 10,
    president: 'John Tyler',
    vicePresidents: '(none)',
    orderLabel: '10. John Tyler',
    fullLine: '10. John Tyler — (none)',
  },
  {
    order: 11,
    president: 'James K. Polk',
    vicePresidents: 'George M. Dallas',
    orderLabel: '11. James K. Polk',
    fullLine: '11. James K. Polk — George M. Dallas',
  },
  {
    order: 12,
    president: 'Zachary Taylor',
    vicePresidents: 'Millard Fillmore',
    orderLabel: '12. Zachary Taylor',
    fullLine: '12. Zachary Taylor — Millard Fillmore',
  },
  {
    order: 13,
    president: 'Millard Fillmore',
    vicePresidents: '(none)',
    orderLabel: '13. Millard Fillmore',
    fullLine: '13. Millard Fillmore — (none)',
  },
  {
    order: 14,
    president: 'Franklin Pierce',
    vicePresidents: 'William R. King',
    orderLabel: '14. Franklin Pierce',
    fullLine: '14. Franklin Pierce — William R. King',
  },
  {
    order: 15,
    president: 'James Buchanan',
    vicePresidents: 'John C. Breckinridge',
    orderLabel: '15. James Buchanan',
    fullLine: '15. James Buchanan — John C. Breckinridge',
  },
  {
    order: 16,
    president: 'Abraham Lincoln',
    vicePresidents: 'Hannibal Hamlin, Andrew Johnson',
    orderLabel: '16. Abraham Lincoln',
    fullLine: '16. Abraham Lincoln — Hannibal Hamlin, Andrew Johnson',
  },
  {
    order: 17,
    president: 'Andrew Johnson',
    vicePresidents: '(none)',
    orderLabel: '17. Andrew Johnson',
    fullLine: '17. Andrew Johnson — (none)',
  },
  {
    order: 18,
    president: 'Ulysses S. Grant',
    vicePresidents: 'Schuyler Colfax, Henry Wilson',
    orderLabel: '18. Ulysses S. Grant',
    fullLine: '18. Ulysses S. Grant — Schuyler Colfax, Henry Wilson',
  },
  {
    order: 19,
    president: 'Rutherford B. Hayes',
    vicePresidents: 'William A. Wheeler',
    orderLabel: '19. Rutherford B. Hayes',
    fullLine: '19. Rutherford B. Hayes — William A. Wheeler',
  },
  {
    order: 20,
    president: 'James A. Garfield',
    vicePresidents: 'Chester A. Arthur',
    orderLabel: '20. James A. Garfield',
    fullLine: '20. James A. Garfield — Chester A. Arthur',
  },
  {
    order: 21,
    president: 'Chester A. Arthur',
    vicePresidents: '(none)',
    orderLabel: '21. Chester A. Arthur',
    fullLine: '21. Chester A. Arthur — (none)',
  },
  {
    order: 22,
    president: 'Grover Cleveland',
    vicePresidents: 'Thomas A. Hendricks',
    orderLabel: '22. Grover Cleveland',
    fullLine: '22. Grover Cleveland — Thomas A. Hendricks',
  },
  {
    order: 23,
    president: 'Benjamin Harrison',
    vicePresidents: 'Levi P. Morton',
    orderLabel: '23. Benjamin Harrison',
    fullLine: '23. Benjamin Harrison — Levi P. Morton',
  },
  {
    order: 24,
    president: 'Grover Cleveland',
    vicePresidents: 'Adlai E. Stevenson',
    orderLabel: '24. Grover Cleveland',
    fullLine: '24. Grover Cleveland — Adlai E. Stevenson',
  },
  {
    order: 25,
    president: 'William McKinley',
    vicePresidents: 'Garret Hobart, Theodore Roosevelt',
    orderLabel: '25. William McKinley',
    fullLine: '25. William McKinley — Garret Hobart, Theodore Roosevelt',
  },
  {
    order: 26,
    president: 'Theodore Roosevelt',
    vicePresidents: 'Charles W. Fairbanks',
    orderLabel: '26. Theodore Roosevelt',
    fullLine: '26. Theodore Roosevelt — Charles W. Fairbanks',
  },
  {
    order: 27,
    president: 'William Howard Taft',
    vicePresidents: 'James S. Sherman',
    orderLabel: '27. William Howard Taft',
    fullLine: '27. William Howard Taft — James S. Sherman',
  },
  {
    order: 28,
    president: 'Woodrow Wilson',
    vicePresidents: 'Thomas R. Marshall',
    orderLabel: '28. Woodrow Wilson',
    fullLine: '28. Woodrow Wilson — Thomas R. Marshall',
  },
  {
    order: 29,
    president: 'Warren G. Harding',
    vicePresidents: 'Calvin Coolidge',
    orderLabel: '29. Warren G. Harding',
    fullLine: '29. Warren G. Harding — Calvin Coolidge',
  },
  {
    order: 30,
    president: 'Calvin Coolidge',
    vicePresidents: 'Charles G. Dawes',
    orderLabel: '30. Calvin Coolidge',
    fullLine: '30. Calvin Coolidge — Charles G. Dawes',
  },
  {
    order: 31,
    president: 'Herbert Hoover',
    vicePresidents: 'Charles Curtis',
    orderLabel: '31. Herbert Hoover',
    fullLine: '31. Herbert Hoover — Charles Curtis',
  },
  {
    order: 32,
    president: 'Franklin D. Roosevelt',
    vicePresidents: 'John Nance Garner, Henry A. Wallace, Harry S. Truman',
    orderLabel: '32. Franklin D. Roosevelt',
    fullLine: '32. Franklin D. Roosevelt — John Nance Garner, Henry A. Wallace, Harry S. Truman',
  },
  {
    order: 33,
    president: 'Harry S. Truman',
    vicePresidents: 'Alben W. Barkley',
    orderLabel: '33. Harry S. Truman',
    fullLine: '33. Harry S. Truman — Alben W. Barkley',
  },
  {
    order: 34,
    president: 'Dwight D. Eisenhower',
    vicePresidents: 'Richard Nixon',
    orderLabel: '34. Dwight D. Eisenhower',
    fullLine: '34. Dwight D. Eisenhower — Richard Nixon',
  },
  {
    order: 35,
    president: 'John F. Kennedy',
    vicePresidents: 'Lyndon B. Johnson',
    orderLabel: '35. John F. Kennedy',
    fullLine: '35. John F. Kennedy — Lyndon B. Johnson',
  },
  {
    order: 36,
    president: 'Lyndon B. Johnson',
    vicePresidents: 'Hubert Humphrey',
    orderLabel: '36. Lyndon B. Johnson',
    fullLine: '36. Lyndon B. Johnson — Hubert Humphrey',
  },
  {
    order: 37,
    president: 'Richard Nixon',
    vicePresidents: 'Spiro Agnew, Gerald Ford',
    orderLabel: '37. Richard Nixon',
    fullLine: '37. Richard Nixon — Spiro Agnew, Gerald Ford',
  },
  {
    order: 38,
    president: 'Gerald Ford',
    vicePresidents: 'Nelson Rockefeller',
    orderLabel: '38. Gerald Ford',
    fullLine: '38. Gerald Ford — Nelson Rockefeller',
  },
  {
    order: 39,
    president: 'Jimmy Carter',
    vicePresidents: 'Walter Mondale',
    orderLabel: '39. Jimmy Carter',
    fullLine: '39. Jimmy Carter — Walter Mondale',
  },
  {
    order: 40,
    president: 'Ronald Reagan',
    vicePresidents: 'George H. W. Bush',
    orderLabel: '40. Ronald Reagan',
    fullLine: '40. Ronald Reagan — George H. W. Bush',
  },
  {
    order: 41,
    president: 'George H. W. Bush',
    vicePresidents: 'Dan Quayle',
    orderLabel: '41. George H. W. Bush',
    fullLine: '41. George H. W. Bush — Dan Quayle',
  },
  {
    order: 42,
    president: 'Bill Clinton',
    vicePresidents: 'Al Gore',
    orderLabel: '42. Bill Clinton',
    fullLine: '42. Bill Clinton — Al Gore',
  },
  {
    order: 43,
    president: 'George W. Bush',
    vicePresidents: 'Dick Cheney',
    orderLabel: '43. George W. Bush',
    fullLine: '43. George W. Bush — Dick Cheney',
  },
  {
    order: 44,
    president: 'Barack Obama',
    vicePresidents: 'Joe Biden',
    orderLabel: '44. Barack Obama',
    fullLine: '44. Barack Obama — Joe Biden',
  },
  {
    order: 45,
    president: 'Donald Trump',
    vicePresidents: 'Mike Pence',
    orderLabel: '45. Donald Trump',
    fullLine: '45. Donald Trump — Mike Pence',
  },
  {
    order: 46,
    president: 'Joe Biden',
    vicePresidents: 'Kamala Harris',
    orderLabel: '46. Joe Biden',
    fullLine: '46. Joe Biden — Kamala Harris',
  },
  {
    order: 47,
    president: 'Donald Trump',
    vicePresidents: 'JD Vance',
    orderLabel: '47. Donald Trump',
    fullLine: '47. Donald Trump — JD Vance',
  },
];

/**
 * Returns a slice of the verbatim presidents list for a given 1-based order range.
 */
export function getPresidentsSlice(start = 1, end = 47): PresidentEntry[] {
  const s = Math.max(1, Math.min(start, 47));
  const e = Math.max(s, Math.min(end, 47));
  return PRESIDENTS_VERBATIM_LIST.slice(s - 1, e);
}

/**
 * Formats "Presidents in order": each item is "1. George Washington", etc.
 */
export function getPresidentsInOrder(start = 1, end = 47): string[] {
  return getPresidentsSlice(start, end).map((p) => p.orderLabel);
}

/**
 * Formats "Presidents with VPs": each item is "1. George Washington — John Adams", etc.
 */
export function getPresidentsWithVPs(start = 1, end = 47): string[] {
  return getPresidentsSlice(start, end).map((p) => p.fullLine);
}
