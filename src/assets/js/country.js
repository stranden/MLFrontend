// Unified mapping for Alpha-2, Alpha-3 to IOC and vice versa
const countryCodeMapping = {
    'AE': { alpha3: 'ARE', ioc: 'UAE' },
    'AG': { alpha3: 'ATG', ioc: 'ANT' },
    'AI': { alpha3: 'AIA', ioc: 'AIA' },
    'AL': { alpha3: 'ALB', ioc: 'ALB' },
    'AM': { alpha3: 'ARM', ioc: 'ARM' },
    'AO': { alpha3: 'AGO', ioc: 'ANG' },
    'AR': { alpha3: 'ARG', ioc: 'ARG' },
    'AS': { alpha3: 'ASM', ioc: 'ASA' },
    'AT': { alpha3: 'AUT', ioc: 'AUT' },
    'AU': { alpha3: 'AUS', ioc: 'AUS' },
    'AW': { alpha3: 'ABW', ioc: 'ARU' },
    'AX': { alpha3: 'ALA', ioc: 'ÅLAND' },
    'AZ': { alpha3: 'AZE', ioc: 'AZE' },
    'BA': { alpha3: 'BIH', ioc: 'BIH' },
    'BB': { alpha3: 'BRB', ioc: 'BAR' },
    'BD': { alpha3: 'BGD', ioc: 'BAN' },
    'BE': { alpha3: 'BEL', ioc: 'BEL' },
    'BF': { alpha3: 'BFA', ioc: 'BUR' },
    'BG': { alpha3: 'BGR', ioc: 'BUL' },
    'BH': { alpha3: 'BHR', ioc: 'BHR' },
    'BI': { alpha3: 'BDI', ioc: 'BDI' },
    'BJ': { alpha3: 'BEN', ioc: 'BEN' },
    'BL': { alpha3: 'BLM', ioc: 'BLM' },
    'BM': { alpha3: 'BMU', ioc: 'BER' },
    'BN': { alpha3: 'BRN', ioc: 'BRU' },
    'BO': { alpha3: 'BOL', ioc: 'BOL' },
    'BQ': { alpha3: 'BES', ioc: 'BES' },
    'BR': { alpha3: 'BRA', ioc: 'BRA' },
    'BS': { alpha3: 'BHS', ioc: 'BAH' },
    'BT': { alpha3: 'BTN', ioc: 'BTN' },
    'BV': { alpha3: 'BVT', ioc: 'BVT' },
    'BW': { alpha3: 'BWA', ioc: 'BOT' },
    'BY': { alpha3: 'BLR', ioc: 'BLR' },
    'BZ': { alpha3: 'BLZ', ioc: 'BLZ' },
    'CA': { alpha3: 'CAN', ioc: 'CAN' },
    'CC': { alpha3: 'CCK', ioc: 'CCK' },
    'CD': { alpha3: 'COD', ioc: 'COD' },
    'CF': { alpha3: 'CAF', ioc: 'CAF' },
    'CG': { alpha3: 'COG', ioc: 'COG' },
    'CH': { alpha3: 'CHE', ioc: 'SUI' },
    'CI': { alpha3: 'CIV', ioc: 'CIV' },
    'CK': { alpha3: 'COK', ioc: 'COK' },
    'CL': { alpha3: 'CHL', ioc: 'CHI' },
    'CM': { alpha3: 'CMR', ioc: 'CMR' },
    'CN': { alpha3: 'CHN', ioc: 'CHN' },
    'CO': { alpha3: 'COL', ioc: 'COL' },
    'CR': { alpha3: 'CRI', ioc: 'CRC' },
    'CU': { alpha3: 'CUB', ioc: 'CUB' },
    'CV': { alpha3: 'CPV', ioc: 'CPV' },
    'CW': { alpha3: 'CUW', ioc: 'CUW' },
    'CX': { alpha3: 'CXR', ioc: 'CXR' },
    'CY': { alpha3: 'CYP', ioc: 'CYP' },
    'CZ': { alpha3: 'CZE', ioc: 'CZE' },
    'DE': { alpha3: 'DEU', ioc: 'GER' },
    'DJ': { alpha3: 'DJI', ioc: 'DJI' },
    'DK': { alpha3: 'DNK', ioc: 'DEN' },
    'DM': { alpha3: 'DMA', ioc: 'DMA' },
    'DO': { alpha3: 'DOM', ioc: 'DOM' },
    'DZ': { alpha3: 'DZA', ioc: 'DZA' },
    'EC': { alpha3: 'ECU', ioc: 'ECU' },
    'EE': { alpha3: 'EST', ioc: 'EST' },
    'EG': { alpha3: 'EGY', ioc: 'EGY' },
    'EH': { alpha3: 'ESH', ioc: 'ESH' },
    'ER': { alpha3: 'ERI', ioc: 'ERI' },
    'ES': { alpha3: 'ESP', ioc: 'ESP' },
    'ET': { alpha3: 'ETH', ioc: 'ETH' },
    'FI': { alpha3: 'FIN', ioc: 'FIN' },
    'FJ': { alpha3: 'FJI', ioc: 'FIJ' },
    'FM': { alpha3: 'FSM', ioc: 'FSM' },
    'FO': { alpha3: 'FRO', ioc: 'FRO' },
    'FR': { alpha3: 'FRA', ioc: 'FRA' },
    'GA': { alpha3: 'GAB', ioc: 'GAB' },
    'GB': { alpha3: 'GBR', ioc: 'GBR' },
    'GD': { alpha3: 'GRD', ioc: 'GRD' },
    'GE': { alpha3: 'GEO', ioc: 'GEO' },
    'GF': { alpha3: 'GUF', ioc: 'GUF' },
    'GG': { alpha3: 'GGY', ioc: 'GGY' },
    'GH': { alpha3: 'GHA', ioc: 'GHA' },
    'GI': { alpha3: 'GIB', ioc: 'GIB' },
    'GL': { alpha3: 'GRL', ioc: 'GRL' },
    'GM': { alpha3: 'GMB', ioc: 'GMB' },
    'GN': { alpha3: 'GIN', ioc: 'GIN' },
    'GP': { alpha3: 'GLP', ioc: 'GLP' },
    'GQ': { alpha3: 'GNQ', ioc: 'GNQ' },
    'GR': { alpha3: 'GRC', ioc: 'GRE' },
    'GT': { alpha3: 'GTM', ioc: 'GUA' },
    'GU': { alpha3: 'GUM', ioc: 'GUM' },
    'GW': { alpha3: 'GNB', ioc: 'GNB' },
    'GY': { alpha3: 'GUY', ioc: 'GUY' },
    'HK': { alpha3: 'HKG', ioc: 'HKG' },
    'HM': { alpha3: 'HMD', ioc: 'HMD' },
    'HN': { alpha3: 'HND', ioc: 'HND' },
    'HR': { alpha3: 'HRV', ioc: 'CRO' },
    'HT': { alpha3: 'HTI', ioc: 'HTI' },
    'HU': { alpha3: 'HUN', ioc: 'HUN' },
    'ID': { alpha3: 'IDN', ioc: 'IDN' },
    'IE': { alpha3: 'IRL', ioc: 'IRL' },
    'IL': { alpha3: 'ISR', ioc: 'ISR' },
    'IM': { alpha3: 'IOM', ioc: 'IOM' },
    'IN': { alpha3: 'IND', ioc: 'IND' },
    'IO': { alpha3: 'IOT', ioc: 'IOT' },
    'IQ': { alpha3: 'IRQ', ioc: 'IRQ' },
    'IR': { alpha3: 'IRN', ioc: 'IRN' },
    'IS': { alpha3: 'ISL', ioc: 'ISL' },
    'IT': { alpha3: 'ITA', ioc: 'ITA' },
    'JE': { alpha3: 'JEY', ioc: 'JEY' },
    'JM': { alpha3: 'JAM', ioc: 'JAM' },
    'JO': { alpha3: 'JOR', ioc: 'JOR' },
    'JP': { alpha3: 'JPN', ioc: 'JPN' },
    'KE': { alpha3: 'KEN', ioc: 'KEN' },
    'KG': { alpha3: 'KGZ', ioc: 'KGZ' },
    'KH': { alpha3: 'KHM', ioc: 'KHM' },
    'KI': { alpha3: 'KIR', ioc: 'KIR' },
    'KM': { alpha3: 'COM', ioc: 'COM' },
    'KN': { alpha3: 'KNA', ioc: 'KNA' },
    'KP': { alpha3: 'PRK', ioc: 'PRK' },
    'KR': { alpha3: 'KOR', ioc: 'KOR' },
    'KW': { alpha3: 'KWT', ioc: 'KWT' },
    'KY': { alpha3: 'CYM', ioc: 'CYM' },
    'KZ': { alpha3: 'KAZ', ioc: 'KAZ' },
    'LA': { alpha3: 'LAO', ioc: 'LAO' },
    'LB': { alpha3: 'LBN', ioc: 'LBN' },
    'LC': { alpha3: 'LCA', ioc: 'LCA' },
    'LI': { alpha3: 'LIE', ioc: 'LIE' },
    'LK': { alpha3: 'LKA', ioc: 'LKA' },
    'LR': { alpha3: 'LBR', ioc: 'LBR' },
    'LS': { alpha3: 'LSO', ioc: 'LSO' },
    'LT': { alpha3: 'LTU', ioc: 'LTU' },
    'LU': { alpha3: 'LUX', ioc: 'LUX' },
    'LV': { alpha3: 'LVA', ioc: 'LVA' },
    'LY': { alpha3: 'LBY', ioc: 'LBY' },
    'MA': { alpha3: 'MAR', ioc: 'MAR' },
    'MC': { alpha3: 'MCO', ioc: 'MCO' },
    'MD': { alpha3: 'MDA', ioc: 'MDA' },
    'ME': { alpha3: 'MNE', ioc: 'MNE' },
    'MF': { alpha3: 'MAF', ioc: 'MAF' },
    'MG': { alpha3: 'MDG', ioc: 'MDG' },
    'MH': { alpha3: 'MHL', ioc: 'MHL' },
    'MK': { alpha3: 'MKD', ioc: 'MKD' },
    'ML': { alpha3: 'MLI', ioc: 'MLI' },
    'MM': { alpha3: 'MMR', ioc: 'MMR' },
    'MN': { alpha3: 'MNG', ioc: 'MNG' },
    'MO': { alpha3: 'MAC', ioc: 'MAC' },
    'MP': { alpha3: 'NMP', ioc: 'NMP' },
    'MQ': { alpha3: 'MTQ', ioc: 'MTQ' },
    'MR': { alpha3: 'MRT', ioc: 'MRT' },
    'MS': { alpha3: 'MSR', ioc: 'MSR' },
    'MT': { alpha3: 'MLT', ioc: 'MLT' },
    'MU': { alpha3: 'MUS', ioc: 'MUS' },
    'MV': { alpha3: 'MDV', ioc: 'MDV' },
    'MW': { alpha3: 'MWI', ioc: 'MWI' },
    'MX': { alpha3: 'MEX', ioc: 'MEX' },
    'MY': { alpha3: 'MYS', ioc: 'MYS' },
    'MZ': { alpha3: 'MOZ', ioc: 'MOZ' },
    'NA': { alpha3: 'NAM', ioc: 'NAM' },
    'NC': { alpha3: 'NCL', ioc: 'NCL' },
    'NE': { alpha3: 'NER', ioc: 'NER' },
    'NF': { alpha3: 'NFK', ioc: 'NFK' },
    'NG': { alpha3: 'NGA', ioc: 'NGA' },
    'NI': { alpha3: 'NIC', ioc: 'NIC' },
    'NL': { alpha3: 'NLD', ioc: 'NLD' },
    'NO': { alpha3: 'NOR', ioc: 'NOR' },
    'NP': { alpha3: 'NPL', ioc: 'NEP' },
    'NR': { alpha3: 'NRU', ioc: 'NRU' },
    'NU': { alpha3: 'NIU', ioc: 'NIU' },
    'NZ': { alpha3: 'NZL', ioc: 'NZL' },
    'OM': { alpha3: 'OMA', ioc: 'OMA' },
    'PA': { alpha3: 'PAN', ioc: 'PAN' },
    'PE': { alpha3: 'PER', ioc: 'PER' },
    'PF': { alpha3: 'PYF', ioc: 'PYF' },
    'PG': { alpha3: 'PNG', ioc: 'PNG' },
    'PH': { alpha3: 'PHL', ioc: 'PHI' },
    'PK': { alpha3: 'PAK', ioc: 'PAK' },
    'PL': { alpha3: 'POL', ioc: 'POL' },
    'PM': { alpha3: 'SPM', ioc: 'SPM' },
    'PN': { alpha3: 'PCN', ioc: 'PCN' },
    'PR': { alpha3: 'PUR', ioc: 'PUR' },
    'PT': { alpha3: 'PRT', ioc: 'PRT' },
    'PW': { alpha3: 'PLW', ioc: 'PLW' },
    'PY': { alpha3: 'PRY', ioc: 'PRY' },
    'QA': { alpha3: 'QAT', ioc: 'QAT' },
    'RE': { alpha3: 'REU', ioc: 'REU' },
    'RO': { alpha3: 'ROU', ioc: 'ROU' },
    'RS': { alpha3: 'SRB', ioc: 'SRB' },
    'RU': { alpha3: 'RUS', ioc: 'RUS' },
    'RW': { alpha3: 'RWA', ioc: 'RWA' },
    'SA': { alpha3: 'KSA', ioc: 'KSA' },
    'SB': { alpha3: 'SLB', ioc: 'SLB' },
    'SC': { alpha3: 'SYC', ioc: 'SYC' },
    'SCO': { alpha3: 'SCO', ioc: 'SCO' },
    'SD': { alpha3: 'SDN', ioc: 'SDN' },
    'SE': { alpha3: 'SWE', ioc: 'SWE' },
    'SG': { alpha3: 'SIN', ioc: 'SIN' },
    'SH': { alpha3: 'SHN', ioc: 'SHN' },
    'SI': { alpha3: 'SVN', ioc: 'SVN' },
    'SJ': { alpha3: 'SJM', ioc: 'SJM' },
    'SK': { alpha3: 'SVK', ioc: 'SVK' },
    'SL': { alpha3: 'SLE', ioc: 'SLE' },
    'SM': { alpha3: 'SMR', ioc: 'SMR' },
    'SN': { alpha3: 'SEN', ioc: 'SEN' },
    'SO': { alpha3: 'SOM', ioc: 'SOM' },
    'SR': { alpha3: 'SUR', ioc: 'SUR' },
    'SS': { alpha3: 'SSD', ioc: 'SSD' },
    'ST': { alpha3: 'STP', ioc: 'STP' },
    'SV': { alpha3: 'SLV', ioc: 'SLV' },
    'SX': { alpha3: 'SXM', ioc: 'SXM' },
    'SY': { alpha3: 'SYR', ioc: 'SYR' },
    'SZ': { alpha3: 'SWZ', ioc: 'SWZ' },
    'TC': { alpha3: 'TCA', ioc: 'TCA' },
    'TD': { alpha3: 'TCD', ioc: 'TCD' },
    'TF': { alpha3: 'ATF', ioc: 'ATF' },
    'TG': { alpha3: 'TGO', ioc: 'TGO' },
    'TH': { alpha3: 'THA', ioc: 'THA' },
    'TJ': { alpha3: 'TJK', ioc: 'TJK' },
    'TK': { alpha3: 'TKL', ioc: 'TKL' },
    'TL': { alpha3: 'TLS', ioc: 'TLS' },
    'TM': { alpha3: 'TKM', ioc: 'TKM' },
    'TN': { alpha3: 'TUN', ioc: 'TUN' },
    'TO': { alpha3: 'TON', ioc: 'TON' },
    'TR': { alpha3: 'TUR', ioc: 'TUR' },
    'TT': { alpha3: 'TTO', ioc: 'TTO' },
    'TV': { alpha3: 'TUV', ioc: 'TUV' },
    'TZ': { alpha3: 'TZA', ioc: 'TAN' },
    'UA': { alpha3: 'UKR', ioc: 'UKR' },
    'UG': { alpha3: 'UGA', ioc: 'UGA' },
    'UM': { alpha3: 'UMI', ioc: 'UMI' },
    'UN': { alpha3: 'UNK', ioc: 'UNK' },
    'US': { alpha3: 'USA', ioc: 'USA' },
    'UY': { alpha3: 'URY', ioc: 'URU' },
    'UZ': { alpha3: 'UZB', ioc: 'UZB' },
    'VA': { alpha3: 'VAT', ioc: 'VAT' },
    'VC': { alpha3: 'VCT', ioc: 'VCT' },
    'VE': { alpha3: 'VEN', ioc: 'VEN' },
    'VG': { alpha3: 'VGB', ioc: 'VGB' },
    'VI': { alpha3: 'VIR', ioc: 'VIR' },
    'VN': { alpha3: 'VNM', ioc: 'VNM' },
    'VU': { alpha3: 'VUT', ioc: 'VUT' },
    'WF': { alpha3: 'WLF', ioc: 'WLF' },
    'WS': { alpha3: 'WSM', ioc: 'WSM' },
    'YE': { alpha3: 'YEM', ioc: 'YEM' },
    'YT': { alpha3: 'MYT', ioc: 'MYT' },
    'ZA': { alpha3: 'ZAF', ioc: 'RSA' },
    'ZM': { alpha3: 'ZMB', ioc: 'ZAM' },
    'ZW': { alpha3: 'ZWE', ioc: 'ZIM' }
  };
  
// Reverse mapping: IOC to Alpha-2 and Alpha-3
const reverseMapping = Object.fromEntries(
  Object.entries(countryCodeMapping).flatMap(([alpha2, { alpha3, ioc }]) => [
    [ioc, { alpha2, alpha3 }],
    [alpha3, { alpha2, ioc }]
  ])
);

// Conversion functions
export function convertAlpha2ToIoc(alpha2Code) {
  if (!alpha2Code || typeof alpha2Code !== 'string') {
    console.error('Invalid alpha2Code:', alpha2Code);
    return 'Unknown';
  }
  const mapping = countryCodeMapping[alpha2Code];
  if (!mapping) {
    console.warn('Alpha-2 code not found:', alpha2Code);
    return 'Unknown';
  }
  return mapping.ioc;
}

export function convertIocToAlpha2(iocCode) {
  if (!iocCode || typeof iocCode !== 'string') {
    console.error('Invalid iocCode:', iocCode);
    return 'Unknown';
  }
  const mapping = reverseMapping[iocCode];
  if (!mapping) {
    console.warn('IOC code not found:', iocCode);
    return 'Unknown';
  }
  return mapping.alpha2;
}

export function convertAlpha3ToIoc(alpha3Code) {
  if (!alpha3Code || typeof alpha3Code !== 'string') {
    console.error('Invalid alpha3Code:', alpha3Code);
    return 'Unknown';
  }
  const mapping = reverseMapping[alpha3Code];
  if (!mapping) {
    console.warn('Alpha-3 code not found:', alpha3Code);
    return 'Unknown';
  }
  return mapping.ioc;
}

export function convertIocToAlpha3(iocCode) {
  if (!iocCode || typeof iocCode !== 'string') {
    console.error('Invalid iocCode:', iocCode);
    return 'Unknown';
  }
  const mapping = reverseMapping[iocCode];
  if (!mapping) {
    console.warn('IOC code not found:', iocCode);
    return 'Unknown';
  }
  return mapping.alpha3;
}

export function convertAlpha2ToAlpha3(alpha2Code) {
  if (!alpha2Code || typeof alpha2Code !== 'string') {
    console.error('Invalid alpha2Code:', alpha2Code);
    return 'Unknown';
  }
  const mapping = countryCodeMapping[alpha2Code];
  if (!mapping) {
    console.warn('Alpha-2 code not found:', alpha2Code);
    return 'Unknown';
  }
  return mapping.alpha3;
}

export function convertAlpha3ToAlpha2(alpha3Code) {
  if (!alpha3Code || typeof alpha3Code !== 'string') {
    console.error('Invalid alpha3Code:', alpha3Code);
    return 'Unknown';
  }
  const mapping = reverseMapping[alpha3Code];
  if (!mapping) {
    console.warn('Alpha-3 code not found:', alpha3Code);
    return 'Unknown';
  }
  return mapping.alpha2;
}
  