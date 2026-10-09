import { existsSync } from "node:fs";
import { join } from "node:path";

const FILE = "resume/Pranav-Auti-Resume.pdf";

/**
 * The résumé link only exists when the PDF is in `public/`. Until then every résumé
 * entry point leads to the About page's résumé section, which says how to get it.
 */
export const RESUME_PDF: string | null = existsSync(join(process.cwd(), "public", FILE)) ? `/${FILE}` : null;

export const RESUME_HREF = RESUME_PDF ?? "/about#resume";
