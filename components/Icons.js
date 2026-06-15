const Ic = ({ d, size = 18, fill = false, sw = 1.8, children, className, style, ...p }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    {...p}
  >
    {d ? <path d={d} /> : children}
  </svg>
);

export const Icons = {
  logo: (p) => (
    <svg width={p?.size || 20} height={p?.size || 20} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3" /><circle cx="16" cy="8" r="3" />
      <circle cx="8" cy="16" r="3" /><circle cx="16" cy="16" r="3" />
    </svg>
  ),
  scan: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M3 12h18"/></Ic>,
  grid: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></Ic>,
  records: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M4 4h16v16H4z" opacity="0"/><path d="M8 6h11"/><path d="M8 12h11"/><path d="M8 18h11"/><path d="M4 6h.01"/><path d="M4 12h.01"/><path d="M4 18h.01"/></Ic>,
  wifi: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><path d="M2 9a15 15 0 0 1 20 0"/><circle cx="12" cy="19.5" r="0.6" fill="currentColor"/></Ic>,
  camera: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.2"/></Ic>,
  logout: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></Ic>,
  upload: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v13"/></Ic>,
  refresh: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></Ic>,
  trash: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></Ic>,
  check: (p) => <Ic size={p?.size} sw={p?.sw} className={p?.className} style={p?.style}><path d="M20 6L9 17l-5-5"/></Ic>,
  checkCircle: (p) => <Ic size={p?.size} sw={p?.sw || 1.8} className={p?.className} style={p?.style}><circle cx="12" cy="12" r="9"/><path d="M8.5 12.2l2.4 2.4 4.6-4.8"/></Ic>,
  eye: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></Ic>,
  eyeOff: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M9.9 5.2A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3 3.6"/><path d="M6.6 6.8A17 17 0 0 0 2 12s3.5 7 10 7a9.6 9.6 0 0 0 4.4-1.1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/><path d="M3 3l18 18"/></Ic>,
  arrowRight: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></Ic>,
  arrowLeft: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></Ic>,
  target: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/></Ic>,
  trendUp: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M3 17l6-6 4 4 7-7"/><path d="M17 7h4v4"/></Ic>,
  alert: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9 1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></Ic>,
  xCircle: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6"/><path d="M9 9l6 6"/></Ic>,
  search: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></Ic>,
  download: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></Ic>,
  chevDown: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M6 9l6 6 6-6"/></Ic>,
  filter: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M3 5h18l-7 8v6l-4-2v-4z"/></Ic>,
  clock: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Ic>,
  doc: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M14 3v5h5"/><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></Ic>,
  plus: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><path d="M12 5v14"/><path d="M5 12h14"/></Ic>,
  cpu: (p) => <Ic size={p?.size} className={p?.className} style={p?.style}><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></Ic>,
};
