import React from "react";
import { BLUE, BLUE_LIGHT, INK, SLATE, CREAM } from "@/data/constants";

function NavDropMenu({ items, id, open, setOpen, navigate }) {
  if (open !== id) return null;
  return (
    <div className="absolute left-0 z-[200]" style={{ top:"100%", paddingTop:4 }}
      onMouseEnter={() => setOpen(id)} onMouseLeave={() => setOpen(null)}>
      <div className="bg-white rounded-lg p-3 shadow-lg"
        style={{ minWidth:220, border:`1px solid rgba(0,87,184,0.12)`, borderTop:`2px solid ${BLUE}` }}>
        {items.map(item => (
          <button key={item.label} onClick={() => { navigate(item.key); setOpen(null); }}
            className="w-full text-left px-3 py-2.5 rounded-lg transition-colors"
            onMouseEnter={e => e.currentTarget.style.background = CREAM}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <div className="text-sm font-semibold leading-tight" style={{ color:INK }}>{item.label}</div>
            <div className="text-xs leading-tight mt-0.5" style={{ color:SLATE }}>{item.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default NavDropMenu;
