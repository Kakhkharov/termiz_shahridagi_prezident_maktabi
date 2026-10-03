/**
 * Safely resolves local asset paths for static sites (Vite build, GH Pages, file:// protocol).
 * Ensures encoded URLs and base path handling without corrupting hash (#) or query (?) parameters.
 */
export function getAssetPath(path) {
    if (!path) return '';
    
    // If it's an external URL (http:// or https://), return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }
    
    // Separate hash (#) and query (?) parameters from the file path if present
    let extraParams = '';
    let filePath = path;
    
    const hashOrQueryIdx = filePath.search(/[#?]/);
    if (hashOrQueryIdx !== -1) {
        extraParams = filePath.substring(hashOrQueryIdx);
        filePath = filePath.substring(0, hashOrQueryIdx);
    }
    
    // Strip leading slash if present
    const cleanPath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
    
    // Get base URL from Vite environment or default to './'
    const baseUrl = import.meta.env.BASE_URL || './';
    const prefix = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';

    // Encode path segments to handle spaces, quotes, and special characters properly
    const encodedSegments = cleanPath.split('/').map(segment => encodeURIComponent(segment));
    
    return prefix + encodedSegments.join('/') + extraParams;
}

