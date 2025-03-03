// src/assets/js/utils/url.js
export function extractLogosFromUrl() {
    const queryParams = new URLSearchParams(window.location.search);
    const logosParam = queryParams.get('logos');
    const titleParam = queryParams.get('title');
    const disciplineParam = queryParams.get('discipline');

    return {
        logos: logosParam ? logosParam.split(',') : [],
        title: titleParam ? decodeURIComponent(titleParam) : 'TITLE',
        discipline: disciplineParam ? decodeURIComponent(disciplineParam) : 'DISCIPLINE'
    };
}