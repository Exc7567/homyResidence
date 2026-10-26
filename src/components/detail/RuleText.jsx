import { Copy } from 'lucide-react';
import { BANK_ACCOUNT_NUMBER, CONTACT_PHONE } from '../../data/houseRules';
import { buildWaChatLink } from '../../lib/whatsapp';
import { useToast } from '../common/Toast';

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const NUMBERS = new RegExp(`(${escape(BANK_ACCOUNT_NUMBER)}|${escape(CONTACT_PHONE)})`);

// Clipboard API first; older browsers or a blocked API fall back to a hidden textarea + execCommand.
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length); // iOS
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

function CopyNumber({ value }) {
  const toast = useToast();
  const copy = async () => {
    // Copy failed everywhere: show the number so it can still be copied by hand.
    toast((await copyText(value)) ? 'Tersalin' : `Nomor rekening: ${value}`);
  };
  return (
    <button type="button" className="rule-copy" aria-label="Salin nomor rekening" onClick={copy}>
      <span className="rule-copy__number tabular">{value}</span>
      <Copy size={14} aria-hidden="true" />
    </button>
  );
}

// One Tata Tertib rule: the account number becomes a copy button, the phone number a WhatsApp chat link.
// The visible text stays exactly as written in src/data/houseRules.js.
export default function RuleText({ text }) {
  return text.split(NUMBERS).map((part, i) => {
    if (part === BANK_ACCOUNT_NUMBER) return <CopyNumber key={i} value={part} />;
    if (part === CONTACT_PHONE) {
      return (
        <a key={i} href={buildWaChatLink(part)} target="_blank" rel="noopener noreferrer" className="rule-link">
          {part}
        </a>
      );
    }
    return part;
  });
}
