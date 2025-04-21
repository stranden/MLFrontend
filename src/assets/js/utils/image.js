// src/assets/js/utils/image.js
import { convertIocToAlpha2 } from '@/assets/js/utils/country.js';

export function svgSource(country) {
    try {
        if (country) {
            return require(`@/assets/img/flags/${country}.svg`);
        }
    } catch (error) {
        console.error(`SVG for ${country} not found`, country);
        return null;
    }
}

export function countryFlag(country) {
    console.log(`countryFlag: ${country}`);
    return `fi fi-${convertIocToAlpha2(country).toLowerCase()} fi-rounded`;
}
