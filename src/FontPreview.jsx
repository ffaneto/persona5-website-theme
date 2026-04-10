const FONTS = [
  { name: "Persona5Main", family: "'Persona5Main'" },
];

const LABELS = ["ABOUT ME", "RESUME", "GITHUB LINK", "SOCIALS", "SIDE PROJECTS"];
const SIZES  = [54, 44, 36, 44, 36];
const SKEWS  = [-6, -11, -16, -3, -4];

export default function FontPreview() {
  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      minHeight: '100vh',
      background: '#0d0d0d',
      overflowX: 'auto',
    }}>
      {FONTS.map(font => (
        <div key={font.name} style={{
          flex: '1 0 0',
          minWidth: 220,
          borderRight: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '32px 24px',
          gap: 4,
        }}>
          <div style={{
            fontFamily: "'Persona5Main'",
            fontSize: 11,
            color: '#d92323',
            letterSpacing: 3,
            marginBottom: 20,
            textTransform: 'uppercase',
          }}>
            {font.name}
          </div>
          {LABELS.map((label, i) => (
            <span key={label} style={{
              fontFamily: font.family,
              fontStyle: 'italic',
              fontSize: SIZES[i],
              color: '#ffffff',
              letterSpacing: 1,
              lineHeight: 0.9,
              display: 'block',
              transform: `skewX(${SKEWS[i]}deg)`,
              whiteSpace: 'nowrap',
            }}>
              {label}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
