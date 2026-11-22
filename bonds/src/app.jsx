import React from 'react';
import ReactDOM from 'react-dom/client';
if (window.CanvasRenderingContext2D && !CanvasRenderingContext2D.prototype.roundRect) {
      CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        r = Math.min(typeof r === 'number' ? r : 0, w / 2, h / 2);
        this.moveTo(x + r, y); this.arcTo(x + w, y, x + w, y + h, r); this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r); this.arcTo(x, y, x + w, y, r); this.closePath();
      };
    }


    const { useState, useEffect, useRef, useMemo, useCallback } = React;

    // -------------------------------------------------------------------------
    // 1. CURRICULUM DATA ACROSS ELEMENTARY, MIDDLE, HIGH SCHOOL & UNDERGRADUATE
    // -------------------------------------------------------------------------

    const LEVELS = [
      { id: 'elementary', label: 'Spark Starter', badge: 'Spark Starter' },
      { id: 'middle', label: 'Molecule Builder', badge: 'Molecule Builder' },
      { id: 'high', label: 'Bond Detective', badge: 'Bond Detective' },
      { id: 'ug', label: 'Quantum Lab', badge: 'Quantum Lab' },
    ];

    const BOND_TYPES = {
      ionic: {
        id: 'ionic',
        label: 'Ionic',
        accent: '#BE123C',
        badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
        tabActive: 'bg-rose-700 text-white border-rose-700 shadow-sm',
        summary: {
          elementary:
            'Atoms hold onto tiny moving pieces called electrons, and opposite charges attract each other. In an ionic bond, one atom transfers an outer electron to another, creating (+) and (−) ions that stick together.',
          middle:
            'Valence electrons transfer from a metal atom to a nonmetal atom, creating oppositely charged ions (\\ce{Na+} and \\ce{Cl-}) held together by strong electrostatic attraction.',
          high:
            'A large electronegativity difference (rule of thumb: Δχ ≥ 1.7; exceptions exist, e.g. HF at 1.78 is covalent) drives electron transfer from a low-χ metal to a high-χ nonmetal, forming cations and anions arranged in a 3D crystal lattice.',
          ug:
            'A big pull gap (Δχ ≥ 1.7) pushes an electron over so opposite ions attract strongly in a 3D crystal grid, releasing lattice energy (U_L).',
        },
        analogy: {
          elementary:
            'Think of it like passing a shared token so one side becomes (+) and the other becomes (−), pulling the pair close—just like \\ce{Na+} and \\ce{Cl-} in table salt.',
          middle:
            'In table salt (\\ce{NaCl}), sodium loses one valence electron (\\ce{e-}) to form \\ce{Na+} and chlorine gains one to form \\ce{Cl-}.',
          high:
            'Lattice energy is released as ions pack into a repeating lattice; breaking it requires substantial energy. Forming gaseous Na⁺ + Cl⁻ from atoms actually costs energy (IE 496 vs EA 349 kJ/mol); the lattice energy is what makes NaCl stable, and real ionic solids are lattices, not single NaCl pairs.',
          ug:
            'Higher ion charges and closer packing make the crystal grid much harder to pull apart (|U_L| grows with charge and shrinks with distance r₀). Born–Haber: Na + Cl → Na⁺ + Cl⁻ in the gas phase costs energy (IE 496 vs EA 349 kJ/mol) and the lattice energy pays it back; the two-atom picture is a schematic of one pair inside a lattice.',
        },
        properties: {
          state: {
            elementary: 'Forms rigid, boxy salt-like crystals that can snap if struck hard.',
            middle: 'Brittle crystalline solids at room temperature with high melting points.',
            high: 'High-melting brittle crystals: shifting layers aligns like charges ((+) / (+) or (−) / (−)) that repel and cleave.',
            ug: 'High lattice energy raises melting points; shifting crystal layers pushes matching charges together so they repel and split cleanly.',
          },
          conductivity: {
            elementary: 'Solid crystals do not conduct well on their own, but dissolved or melted ions can carry charge.',
            middle: 'Poor conductors as solids because ions are locked in place, but good conductors when melted or dissolved.',
            high: 'Insulators as solids (immobile ions); conduct electricity when molten or in aqueous solution as free \\ce{Na+} and \\ce{Cl-} ions move.',
            ug: 'Locked ions cannot carry current in a solid, so it does not conduct electricity until melted or dissolved so ions can move freely.',
          },
          solubility: {
            elementary: 'Many salts dissolve in water as water molecules pull the charged ions apart.',
            middle: 'Many ionic compounds dissolve in polar water because attractions to water outweigh ion-ion pull.',
            high: 'Often soluble in polar solvents like \\ce{H2O} via ion–dipole hydration when hydration enthalpy overcomes lattice energy (not all: \\ce{MgO}, \\ce{AgCl} and \\ce{CaCO3} are nearly insoluble).',
            ug: 'Dissolving happens when water molecules pull strongly enough on the ions to beat the attraction holding the crystal grid together.',
          },
        },
      },
      covalent: {
        id: 'covalent',
        label: 'Nonpolar Covalent',
        accent: '#0F766E',
        badgeBg: 'bg-teal-50 text-teal-800 border-teal-200',
        tabActive: 'bg-teal-700 text-white border-teal-700 shadow-sm',
        summary: {
          elementary:
            'Instead of one atom taking an electron completely, two atoms share pairs of outer electrons so both reach a more balanced, stable arrangement.',
          middle:
            'Atoms share one or more pairs of valence electrons to reach stable outer shells, forming distinct molecules like \\ce{O2} or \\ce{N2}.',
          high:
            'Atoms with similar electronegativities (Δχ < 0.5) share bonding electron pairs nearly equally through overlapping valence orbitals.',
          ug:
            'When two atoms have almost the same pull (Δχ < 0.5), their electron clouds overlap evenly, keeping shared electrons balanced between both centers.',
        },
        analogy: {
          elementary:
            'Like two partners holding both ends of a jump rope together—sharing keeps them linked without anyone letting go.',
          middle:
            'In oxygen gas (\\ce{O2}), two oxygen atoms share two pairs of electrons (a double bond).',
          high:
            'Equal sharing creates a nonpolar bond with no permanent partial charges (δ+ or δ−).',
          ug:
            'Because the shared cloud is even, there is no built-in (+) or (−) end (μ = 0), and nearby molecules mostly feel gentle dispersion attraction. (Schematic only: real O₂ is paramagnetic with two unpaired electrons, which Lewis structures miss; molecular orbital theory explains it, with bond order 2.)',
        },
        properties: {
          state: {
            elementary: 'Often forms gases, liquids, or soft molecular solids—unless linked into a giant network.',
            middle: 'Many molecular covalent substances are gases, liquids, or low-melting solids; network solids like diamond are very hard.',
            high: 'Discrete molecules usually have lower melting/boiling points (weak intermolecular forces), whereas covalent network solids (e.g., diamond) are rigid and high-melting.',
            ug: 'Separate molecules have gentle attractions between them and melt easily, unless locked into a 3D bonded network like diamond.',
          },
          conductivity: {
            elementary: 'Usually does not conduct electricity because electrons stay tied to the shared bond.',
            middle: 'Generally poor conductors of electricity because electrons stay localized in bonds or molecules.',
            high: 'Typically non-conductive (no mobile ions or delocalized electrons), except specialized π-conjugated systems or graphite.',
            ug: 'Electrons stay held in bonds rather than roaming freely, so ordinary covalent molecules do not conduct electricity well.',
          },
          solubility: {
            elementary: 'Nonpolar shared molecules mix better with other nonpolar liquids than with water.',
            middle: 'Nonpolar covalent molecules dissolve better in nonpolar liquids than in water.',
            high: '"Like dissolves like": nonpolar covalent molecules dissolve readily in nonpolar solvents rather than strongly hydrogen-bonded \\ce{H2O}.',
            ug: 'Evenly shared molecules mix easily with other even-pull solvents, whereas water prefers clinging to other polar or charged partners.',
          },
        },
      },
      polar: {
        id: 'polar',
        label: 'Polar Covalent',
        accent: '#1D4ED8',
        badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
        tabActive: 'bg-blue-700 text-white border-blue-700 shadow-sm',
        summary: {
          elementary:
            'Atoms still share electrons, but one pulls harder than the other—giving the stronger puller a slight negative end (δ−) and the other a slight positive end (δ+).',
          middle:
            'Shared electrons spend more time near the more electronegative atom, creating partial charges (δ+ and δ−) without a full electron jump.',
          high:
            'An intermediate electronegativity difference (0.5 ≤ Δχ < 1.7) skews shared electron density toward the more electronegative atom, creating a bond dipole (δ− / δ+).',
          ug:
            'A medium pull gap (0.5 ≤ Δχ < 1.7) pulls the shared electron cloud closer to the stronger atom, creating slight δ− and δ+ ends and a dipole (μ).',
        },
        analogy: {
          elementary:
            'Like sharing a blanket where one person pulls it slightly closer to their side while both still share it.',
          middle:
            'In water (\\ce{H2O}), oxygen pulls shared electrons closer than hydrogen does, making oxygen slightly negative (δ−) and each hydrogen slightly positive (δ+).',
          high:
            'Bent molecular shape in \\ce{H2O} (104.5°) prevents the two O–H bond dipoles from canceling out, giving a net molecular dipole.',
          ug:
            'Because water is bent (104.5°), the two slightly tilted bonds do not cancel out—giving \\ce{H2O} a clear overall dipole (μ ≈ 1.85 D).',
        },
        properties: {
          state: {
            elementary: 'Slight (+) and (−) ends help molecules attract each other, often raising boiling points.',
            middle: 'Polar molecules attract each other more strongly than nonpolar ones, often raising boiling points.',
            high: 'Dipole–dipole attractions and hydrogen bonding (e.g., \\ce{H2O}) elevate boiling points above comparable nonpolar molecules.',
            ug: 'Opposite partial ends (δ+ and δ−) tug on neighboring molecules, taking extra heat to pull them apart into a gas.',
          },
          conductivity: {
            elementary: 'Pure water by itself is a poor conductor without dissolved ions.',
            middle: 'Pure polar liquids like distilled water are poor electrical conductors without dissolved ions.',
            high: 'Pure polar molecular substances have very few free charge carriers (pure water: about 10⁻⁷ M ions) and conduct poorly unless ionized or containing dissolved electrolytes.',
            ug: 'Even though water has partial charges, pure \\ce{H2O} has very few free ions (about 10⁻⁷ M each of H₃O⁺ and OH⁻), so it carries almost no current.',
          },
          solubility: {
            elementary: 'Polar molecules mix well with water because partial charges match up nicely.',
            middle: 'Polar molecules like sugar or alcohol dissolve well in water.',
            high: 'Generally soluble in polar solvents like \\ce{H2O} via dipole–dipole and hydrogen-bonding interactions.',
            ug: 'Partial charges line up nicely with water’s δ+ and δ− ends, helping polar molecules mix and dissolve smoothly.',
          },
        },
      },
      metallic: {
        id: 'metallic',
        label: 'Metallic',
        accent: '#B45309',
        badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
        tabActive: 'bg-amber-700 text-white border-amber-700 shadow-sm',
        summary: {
          elementary:
            'Metal atoms share outer electrons across a whole group while keeping a neat arrangement—which helps metals conduct electricity and bend.',
          middle:
            'Metal atoms release outer valence electrons into a shared "sea of electrons" surrounding positively charged metal ions.',
          high:
            'Delocalized valence electrons move freely through a lattice of metal cations, explaining high electrical/thermal conductivity, luster, and malleability.',
          ug:
            'Outer electrons spread across the whole metal grid and move easily, giving metals their shine, bendiness, and strong electrical conduction.',
        },
        analogy: {
          elementary:
            'Like outer electrons moving across a shared space around steady metal cores—helping wires carry current.',
          middle:
            'In copper (\\ce{Cu}), mobile electrons drift easily when a battery pushes them, creating electric current.',
          high:
            'Because the electron sea is non-directional, metal layers can slide without snapping like an ionic crystal.',
          ug:
            'Because roaming electrons cushion the metal cores from any direction, layers can slide without shattering and push current right along.',
        },
        properties: {
          state: {
            elementary: 'Shiny solids that can be hammered or bent rather than shattering easily.',
            middle: 'Malleable (hammered into sheets), ductile (drawn into wires), shiny, and mostly solid at room temperature.',
            high: 'Malleable, ductile, and lustrous solids (except mercury, \\ce{Hg}, a liquid at room temperature) due to non-directional bonding.',
            ug: 'Shared roaming electrons let metal layers bend or flatten without cracking, and reflect light to give metals their shine.',
          },
          conductivity: {
            elementary: 'Moving outer electrons let metals carry electricity well.',
            middle: 'Excellent conductors of both electricity and heat because mobile electrons carry energy fast.',
            high: 'High electrical and thermal conductivity via mobile delocalized valence electrons (lattice vibrations also carry heat, but they scatter electrons and cause electrical resistance).',
            ug: 'Roaming outer electrons carry both electric charge and heat quickly through the metal.',
          },
          solubility: {
            elementary: 'Metals do not dissolve into water like salt.',
            middle: 'Metals do not dissolve in water (some, like sodium, react with it), though they can mix together when melted to form alloys.',
            high: 'Do not dissolve in water or typical molecular solvents (reactive metals such as Na and K react with water instead); metals mix in the molten state to form solid solutions or alloys (e.g., bronze, brass).',
            ug: 'Metals do not dissolve in water, but melting two metals together lets atoms blend into alloys like brass or bronze.',
          },
        },
      },
    };

    const PRESETS = [
      {
        id: 'nacl',
        mhchem: '\\ce{NaCl}',
        smiles: '[Na+].[Cl-]',
        name: 'Table Salt',
        bondType: 'ionic',
        atomA: { symbol: 'Na', name: 'Sodium', en: 0.93, valence: 1, color: '#E11D48' },
        atomB: { symbol: 'Cl', name: 'Chlorine', en: 3.16, valence: 7, color: '#0D9488' },
        formulaNote: {
          elementary: '\\ce{Na} + \\ce{Cl} -> \\ce{Na+} + \\ce{Cl-}',
          middle: '\\ce{Na} -> \\ce{Na+} + \\ce{e-}, \\quad \\ce{Cl} + \\ce{e-} -> \\ce{Cl-}',
          high: '\\ce{Na(s)} + 1/2\\ce{Cl2(g)} -> \\ce{NaCl(s)} \\quad (Δχ = 2.23)',
          ug: '\\ce{Na} + \\ce{Cl} -> \\ce{Na+} + \\ce{Cl-} \\quad (Δχ = 2.23, \\text{strong ion pull})',
        },
        geometryLabel: {
          elementary: 'Checkerboard grid',
          middle: '3D salt cube',
          high: 'Cubic lattice (6:6)',
          ug: '3D salt grid (Fm\\overline{3}m)',
        },
        bondOrder: {
          elementary: '\\ce{1 e-} transferred',
          middle: '\\ce{1 e-} transferred (\\ce{Na+}\\ce{Cl-})',
          high: 'Ionic transfer (Δχ = 2.23)',
          ug: '\\ce{1 e-} transferred (\\ce{Na+}\\ce{Cl-})',
        },
        bondEnergy: {
          elementary: 'Strong grid hold',
          middle: 'High melting heat',
          high: '787 kJ/mol lattice',
          ug: '787 kJ/mol grid hold',
        },
      },
      {
        id: 'h2o',
        mhchem: '\\ce{H2O}',
        smiles: '[H]O[H]',
        name: 'Water (2 H + 1 O)',
        bondType: 'polar',
        atomA: { symbol: 'H', name: 'Hydrogen (×2)', en: 2.20, valence: 1, color: '#6366F1' },
        atomB: { symbol: 'O', name: 'Oxygen', en: 3.44, valence: 6, color: '#2563EB' },
        formulaNote: {
          elementary: '\\ce{2H} + \\ce{O} -> \\ce{H2O} \\quad (\\text{two H atoms + one O atom})',
          middle: '\\ce{H-O-H} \\quad (\\text{two polar shared pairs + two lone pairs on O})',
          high: '\\ce{H2O} \\text{ bent } (104.5°), \\quad Δχ(\\ce{O-H}) = 1.24',
          ug: '\\ce{H-O-H} \\text{ bent } (104.5°), \\quad Δχ = 1.24, \\quad μ = 1.85\\text{ D}',
        },
        geometryLabel: {
          elementary: 'Bent V-shape (2 H)',
          middle: 'Bent molecule',
          high: 'Bent (104.5°)',
          ug: 'Bent V-shape (104.5°)',
        },
        bondOrder: {
          elementary: '2 shared links (\\ce{H-O-H})',
          middle: 'Two single bonds',
          high: '2 polar σ bonds',
          ug: '2 polar shared pairs',
        },
        bondEnergy: {
          elementary: 'Firm shared pull',
          middle: 'Strong \\ce{O-H} link',
          high: '463 kJ/mol (avg \\ce{O-H})',
          ug: '463 kJ/mol bond strength',
        },
      },
      {
        id: 'o2',
        mhchem: '\\ce{O2}',
        smiles: 'O=O',
        name: 'Oxygen Gas',
        bondType: 'covalent',
        atomA: { symbol: 'O', name: 'Oxygen A', en: 3.44, valence: 6, color: '#0F766E' },
        atomB: { symbol: 'O', name: 'Oxygen B', en: 3.44, valence: 6, color: '#0D9488' },
        formulaNote: {
          elementary: '\\ce{O} + \\ce{O} -> \\ce{O2} \\quad (\\text{even sharing})',
          middle: '\\ce{O=O} \\quad (\\text{two shared pairs})',
          high: '\\ce{O=O} \\quad (Δχ = 0.00, \\text{nonpolar covalent})',
          ug: '\\ce{O=O} \\quad (\\text{2 shared pairs}, \\quad Δχ = 0.00)',
        },
        geometryLabel: {
          elementary: 'Two-atom pair',
          middle: 'Straight pair',
          high: 'Linear diatomic',
          ug: 'Straight 2-atom pair',
        },
        bondOrder: {
          elementary: '2 shared pairs',
          middle: 'Double share (\\ce{O=O})',
          high: 'Double bond (1σ + 1π)',
          ug: 'Double share (2 pairs)',
        },
        bondEnergy: {
          elementary: 'Tight even share',
          middle: 'Strong double link',
          high: '498 kJ/mol (\\ce{O=O})',
          ug: '498 kJ/mol bond strength',
        },
      },
      {
        id: 'n2',
        mhchem: '\\ce{N2}',
        smiles: 'N#N',
        name: 'Nitrogen Gas',
        bondType: 'covalent',
        atomA: { symbol: 'N', name: 'Nitrogen A', en: 3.04, valence: 5, color: '#0F766E' },
        atomB: { symbol: 'N', name: 'Nitrogen B', en: 3.04, valence: 5, color: '#115E59' },
        formulaNote: {
          elementary: '\\ce{N} + \\ce{N} -> \\ce{N2} \\quad (\\text{three shared pairs})',
          middle: '\\ce{N#N} \\quad (\\text{three shared electron pairs})',
          high: '\\ce{N#N} \\quad (Δχ = 0.00, \\text{triple bond})',
          ug: '\\ce{N#N} \\quad (\\text{3 shared pairs}, \\quad Δχ = 0.00)',
        },
        geometryLabel: {
          elementary: 'Two-atom pair',
          middle: 'Straight pair',
          high: 'Linear diatomic',
          ug: 'Straight 2-atom pair',
        },
        bondOrder: {
          elementary: '3 shared pairs',
          middle: 'Triple share (\\ce{N#N})',
          high: 'Triple bond (1σ + 2π)',
          ug: 'Triple share (3 pairs)',
        },
        bondEnergy: {
          elementary: 'Extra-strong hold',
          middle: 'Very tough to split',
          high: '945 kJ/mol (\\ce{N#N})',
          ug: '945 kJ/mol (very tough)',
        },
      },
      {
        id: 'hcl',
        mhchem: '\\ce{HCl}',
        smiles: 'Cl',
        name: 'Hydrogen Chloride',
        bondType: 'polar',
        atomA: { symbol: 'H', name: 'Hydrogen', en: 2.20, valence: 1, color: '#6366F1' },
        atomB: { symbol: 'Cl', name: 'Chlorine', en: 3.16, valence: 7, color: '#2563EB' },
        formulaNote: {
          elementary: '\\ce{H} + \\ce{Cl} -> \\ce{HCl} \\quad (\\ce{Cl} \\text{ pulls harder})',
          middle: '\\ce{H-Cl} \\quad (\\text{shared pair pulled toward } \\ce{Cl})',
          high: '\\ce{H-Cl} \\quad (Δχ = 0.96, \\delta^+\\text{–}\\delta^-)',
          ug: '\\ce{H-Cl} \\quad (Δχ = 0.96, \\quad \\text{pulled toward } \\ce{Cl})',
        },
        geometryLabel: {
          elementary: 'Two-atom line',
          middle: 'Straight pair',
          high: 'Linear diatomic',
          ug: 'Straight 2-atom pair',
        },
        bondOrder: {
          elementary: '1 shared pair',
          middle: 'Single polar share',
          high: '1 polar σ bond',
          ug: '1 polar shared pair',
        },
        bondEnergy: {
          elementary: 'Medium-strong pull',
          middle: 'Steady single link',
          high: '431 kJ/mol (\\ce{H-Cl})',
          ug: '431 kJ/mol bond strength',
        },
      },
      {
        id: 'mgo',
        mhchem: '\\ce{MgO}',
        smiles: '[Mg+2].[O-2]',
        name: 'Magnesium Oxide',
        bondType: 'ionic',
        atomA: { symbol: 'Mg', name: 'Magnesium', en: 1.31, valence: 2, color: '#E11D48' },
        atomB: { symbol: 'O', name: 'Oxygen', en: 3.44, valence: 6, color: '#BE123C' },
        formulaNote: {
          elementary: '\\ce{Mg} + \\ce{O} -> \\ce{Mg^{2+}} + \\ce{O^{2-}}',
          middle: '\\ce{Mg^{2+}} \\text{ and } \\ce{O^{2-}} \\quad (\\text{2 electrons transferred})',
          high: '\\ce{MgO(s)} \\quad (Δχ = 2.13, \\text{divalent ions})',
          ug: '\\ce{Mg} + \\ce{O} -> \\ce{Mg^{2+}} + \\ce{O^{2-}} \\quad (Δχ = 2.13)',
        },
        geometryLabel: {
          elementary: 'Tight crystal grid',
          middle: '3D crystal grid',
          high: 'Cubic lattice (2+/2−)',
          ug: '3D salt grid (Fm\\overline{3}m)',
        },
        bondOrder: {
          elementary: '\\ce{2 e-} transferred',
          middle: '\\ce{2 e-} transferred (\\ce{Mg^{2+}} + \\ce{O^{2-}})',
          high: 'Ionic transfer (Δχ = 2.13)',
          ug: '\\ce{2 e-} transferred (\\ce{Mg^{2+}} + \\ce{O^{2-}})',
        },
        bondEnergy: {
          elementary: 'Super-strong grid',
          middle: 'Very high melting heat',
          high: '3791 kJ/mol lattice',
          ug: '3791 kJ/mol (extra strong)',
        },
      },
      {
        id: 'cu',
        mhchem: '\\ce{Cu}',
        smiles: '[Cu]',
        name: 'Copper Metal',
        bondType: 'metallic',
        atomA: { symbol: 'Cu', name: 'Copper Core', en: 1.90, valence: 1, color: '#D97706' },
        atomB: { symbol: 'Cu', name: 'Copper Neighbor', en: 1.90, valence: 1, color: '#B45309' },
        formulaNote: {
          elementary: '\\ce{Cu} \\text{ cores + roaming outer electrons}',
          middle: '\\ce{Cu+} \\text{ lattice in a sea of } \\ce{e-}',
          high: '\\ce{Cu(s)} \\quad (\\text{delocalized valence electrons})',
          ug: '\\ce{Cu} \\text{ cores + roaming outer } \\ce{e-}',
        },
        geometryLabel: {
          elementary: 'Neat metal rows',
          middle: 'Packed metal grid',
          high: 'Face-centered cubic',
          ug: 'Packed metal layers',
        },
        bondOrder: {
          elementary: 'Roaming electron crowd',
          middle: 'Shared electron sea',
          high: 'Delocalized metallic',
          ug: 'Shared roaming electrons',
        },
        bondEnergy: {
          elementary: 'Strong & bendable',
          middle: 'High melting metal',
          high: '336 kJ/mol cohesive',
          ug: '336 kJ/mol (strong & bendable)',
        },
      },
    ];

    const CHALLENGES = [
      {
        id: 'ionic-transfer',
        title: {
          elementary: '1. Make an Electron Jump',
          middle: '1. Trigger Electron Transfer',
          high: '1. Form an Ionic Bond (Δχ ≥ 1.7)',
          ug: '1. Big Pull Gap — Electron Jump (Δχ ≥ 1.7)',
        },
        prompt: {
          elementary:
            'Pick **Ionic** (or move the pull sliders far apart) and make sure the atoms are bonded so an electron jumps across.',
          middle:
            'Select the **Ionic** bond tab or set Δχ ≥ 1.7 with the bond formed so one atom becomes (+) and the other becomes (−).',
          high:
            'Select **Ionic** or adjust sliders so Δχ ≥ 1.70 with the bond active to observe charge transfer and electrostatic attraction.',
          ug:
            'Pick **Ionic** or set the pull sliders far apart (Δχ ≥ 1.70) with the bond formed to see full charge separation.',
        },
        check: (s) => s.bondFormed && (s.bondType === 'ionic' || Math.abs(s.enA - s.enB) >= 1.7),
      },
      {
        id: 'polar-tug',
        title: {
          elementary: '2. Unequal Blanket Tug',
          middle: '2. Create a Polar Share',
          high: '2. Build a Polar Covalent Bond',
          ug: '2. Tilted Share — Polar Bond',
        },
        prompt: {
          elementary:
            'Pick **Polar Covalent** (like water, \\ce{H2O}) where one atom pulls electrons closer without stealing them all the way.',
          middle:
            'Select **Polar Covalent** or set electronegativity sliders to a moderate difference (0.5 ≤ Δχ < 1.7) while bonded.',
          high:
            'Select **Polar Covalent** with 0.50 ≤ Δχ < 1.70 and bond formed to display δ+ / δ− partial charges and dipole direction.',
          ug:
            'Select **Polar Covalent** with a moderate pull gap (0.50 ≤ Δχ < 1.70) while bonded to see δ+ / δ− partial charges and the dipole arrow.',
        },
        check: (s) => {
          const diff = Math.abs(s.enA - s.enB);
          return s.bondFormed && s.bondType === 'polar' && diff >= 0.5 && diff < 1.7;
        },
      },
      {
        id: 'equal-share',
        title: {
          elementary: '3. Fair Even Share',
          middle: '3. Equal Electron Sharing',
          high: '3. Nonpolar Covalent Bond (Δχ < 0.5)',
          ug: '3. Balanced Share (Δχ < 0.5)',
        },
        prompt: {
          elementary:
            'Set both pull sliders to almost the same number (or pick **Nonpolar Covalent**) and keep the atoms bonded so they share evenly.',
          middle:
            'Select **Nonpolar Covalent** or match Atom A and Atom B pull sliders closely (Δχ < 0.5) while the bond is formed.',
          high:
            'Achieve Δχ < 0.50 with **Nonpolar Covalent** bonding active so shared electrons stay centered between the nuclei.',
          ug:
            'Match the two pull values closely (Δχ < 0.50) under **Nonpolar Covalent** bonding so shared electrons stay centered.',
        },
        check: (s) => s.bondFormed && s.bondType === 'covalent' && Math.abs(s.enA - s.enB) < 0.5,
      },
      {
        id: 'stretch-test',
        title: {
          elementary: '4. Pull the Atoms Apart',
          middle: '4. Stretch & Separate the Bond',
          high: '4. Dissociate / Separate the Bond',
          ug: '4. Pull Apart to Break the Bond',
        },
        prompt: {
          elementary:
            'Drag an atom outward or tap **Stretch / Separate** to pull the bonded atoms apart.',
          middle:
            'Click **Stretch / Separate** (or drag an atom outward on the canvas) to move the atoms out of their bonded state.',
          high:
            'Use **Stretch / Separate** or drag an atom outward to separate the bonded pair and observe the bond break.',
          ug:
            'Drag an atom outward or click **Stretch / Separate** to pull the bonded atoms apart past their cozy spacing.',
        },
        check: (s) => !s.bondFormed,
      },
    ];

    const QUIZ_BANK = {
      elementary: [
        {
          q: 'In an **ionic** bond like \\ce{NaCl}, what happens to an outer electron?',
          options: [
            'One atom gives an electron to the other, making (+) and (−) charges that attract.',
            'Both atoms freeze in place and never move.',
            'The atoms turn into a liquid puddle right away.',
          ],
          correct: 0,
          explain:
            'One atom loses an electron (+) and the other gains it (−), and opposite charges pull together.',
        },
        {
          q: 'In water (\\ce{H2O}), why does oxygen get a slight negative feel (δ−)?',
          options: [
            'Oxygen pulls the shared electrons a little closer to itself.',
            'Oxygen has zero electrons.',
            'Hydrogen and oxygen repel each other completely.',
          ],
          correct: 0,
          explain:
            'Oxygen pulls shared electrons closer than hydrogen does, giving oxygen a slight negative pull (δ−).',
        },
        {
          q: 'What makes **metallic** bonding (like in copper wire, \\ce{Cu}) special?',
          options: [
            'Outer electrons can move around freely while metal centers stay in rows.',
            'Electrons are glued to just one spot forever.',
            'There are no electrons in metals.',
          ],
          correct: 0,
          explain:
            'Free-moving outer electrons help metals carry electricity and bend without snapping easily.',
        },
      ],
      middle: [
        {
          q: 'Which best describes a **covalent** bond?',
          options: [
            'Atoms share pairs of valence electrons.',
            'Atoms only stick together when boiled.',
            'A proton jumps from one nucleus to another.',
          ],
          correct: 0,
          explain:
            'Covalent bonds form when atoms share valence electron pairs to achieve more stable outer shells.',
        },
        {
          q: 'How is a **polar covalent** bond different from a **nonpolar covalent** bond?',
          options: [
            'In a polar covalent bond, shared electrons spend more time closer to one atom (δ+ / δ−).',
            'A polar covalent bond never involves sharing electrons.',
            'Nonpolar bonds only happen in metals.',
          ],
          correct: 0,
          explain:
            'Unequal sharing creates partial charges (δ+ and δ−), whereas equal sharing is nonpolar.',
        },
        {
          q: 'Why do metals like \\ce{Cu} conduct electricity well?',
          options: [
            'They have mobile valence electrons that can drift through the metal.',
            'Their nuclei fly around freely like gas.',
            'They contain no charged particles.',
          ],
          correct: 0,
          explain:
            'Mobile valence electrons ("sea of electrons") carry electrical charge through the metal.',
        },
      ],
      high: [
        {
          q: 'Which pair of atoms is most likely to form an **ionic** bond based on electronegativity (Δχ)?',
          options: [
            '\\ce{Na} (χ = 0.93) and \\ce{Cl} (χ = 3.16), where Δχ = 2.23',
            '\\ce{Cl} (χ = 3.16) and \\ce{Cl} (χ = 3.16), where Δχ = 0.00',
            '\\ce{C} (χ = 2.55) and \\ce{S} (χ = 2.58), where Δχ = 0.03',
          ],
          correct: 0,
          explain:
            'A large electronegativity difference (Δχ = 2.23 ≥ 1.7) between a metal and nonmetal favors electron transfer and ionic bonding.',
        },
        {
          q: 'Why is a \\ce{H2O} molecule **polar** overall?',
          options: [
            'Its bent geometry (104.5°) and polar \\ce{O-H} bonds produce a net dipole moment.',
            'Oxygen and hydrogen have identical electronegativities.',
            'It has a symmetrical linear shape that cancels all dipoles.',
          ],
          correct: 0,
          explain:
            'Because \\ce{H2O} is bent (104.5°) and \\ce{O} is more electronegative than \\ce{H}, the bond dipoles do not cancel.',
        },
        {
          q: 'Why are solid ionic crystals typically **brittle** compared to metals?',
          options: [
            'Shifting layers aligns like charges ((+) next to (+), (−) next to (−)), causing repulsion.',
            'Ionic crystals have too many free-moving electrons.',
            'Ionic bonds are weaker than dispersion forces.',
          ],
          correct: 0,
          explain:
            'When force shifts ionic layers, like-charged ions face each other and repel, cleaving the crystal.',
        },
      ],
      ug: [
        {
          q: 'When two different atoms share electrons and one pulls harder (like \\ce{O} pulling harder than \\ce{H}), what happens to the shared electron cloud?',
          options: [
            'More of the shared electron cloud sits closer to the stronger-pulling atom, creating a slight δ− side.',
            'The shared electron cloud disappears completely.',
            'The stronger-pulling atom always becomes positively charged.',
          ],
          correct: 0,
          explain:
            'The atom with the stronger pull draws more shared electron density toward itself, giving it a slight negative shift (δ−).',
        },
        {
          q: 'Why can metals bend and carry electric current easily compared to salt crystals?',
          options: [
            'Outer electrons can roam freely around the metal cores instead of being locked in tight spot-bonds.',
            'Metals have no electrons at all.',
            'Salt crystals have freely drifting electrons everywhere.',
          ],
          correct: 0,
          explain:
            'Free-moving outer electrons carry electric current and let metal layers shift without snapping apart.',
        },
        {
          q: 'Why is \\ce{MgO} held together even more tightly than \\ce{NaCl}?',
          options: [
            'It pairs \\ce{Mg^{2+}} and \\ce{O^{2-}} charges (2+ and 2−) instead of single charges (1+ and 1−).',
            'It has a much larger gap between shared electrons.',
            'Neutral atoms do not attract each other at all.',
          ],
          correct: 0,
          explain:
            'Double charges (2+ and 2−) create much stronger opposite-charge attraction than single charges (1+ and 1−).',
        },
      ],
    };

    // -------------------------------------------------------------------------
    // 2. DETERMINISTIC CHEMICAL FORMULA RENDERER & ERROR BOUNDARY
    // -------------------------------------------------------------------------

    class ModuleErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, message: '' };
      }

      static getDerivedStateFromError(error) {
        return {
          hasError: true,
          message: error?.message || 'An unexpected rendering error occurred.',
        };
      }

      componentDidCatch(error, info) {
        console.error('ModuleErrorBoundary caught error:', error, info);
      }

      render() {
        if (this.state.hasError) {
          return (
            <div className="min-h-screen flex items-center justify-center bg-paper p-6">
              <div className="max-w-md w-full rounded-2xl border border-line bg-white p-6 shadow-sm space-y-3 text-center">
                <h2 className="font-editorial text-xl font-semibold text-ink">
                  Simulation Recovery
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  {this.state.message}
                </p>
                <button
                  type="button"
                  onClick={() => this.setState({ hasError: false, message: '' })}
                  className="px-4 py-2 rounded-xl bg-ink text-white text-sm font-semibold hover:bg-ink/90"
                >
                  Reload Module
                </button>
              </div>
            </div>
          );
        }
        return this.props.children;
      }
    }

    const SUPERSCRIPT_MAP = {
      '+': '⁺',
      '-': '⁻',
      '−': '⁻',
      '0': '⁰',
      '1': '¹',
      '2': '²',
      '3': '³',
      '4': '⁴',
      '5': '⁵',
      '6': '⁶',
      '7': '⁷',
      '8': '⁸',
      '9': '⁹',
    };

    const SUBSCRIPT_MAP = {
      '0': '₀',
      '1': '₁',
      '2': '₂',
      '3': '₃',
      '4': '₄',
      '5': '₅',
      '6': '₆',
      '7': '₇',
      '8': '₈',
      '9': '₉',
    };

    function toSup(str) {
      return String(str)
        .split('')
        .map((ch) => SUPERSCRIPT_MAP[ch] || ch)
        .join('');
    }

    function toSub(str) {
      return String(str)
        .split('')
        .map((ch) => SUBSCRIPT_MAP[ch] || ch)
        .join('');
    }

    // Converts mhchem-style or plain chemical expressions into clean typographic spans
    function formatChemicalExpression(raw) {
      if (!raw) return '';
      let text = String(raw);

      // Unwrap \ce{...} and \text{...} if present
      text = text.replace(/\\ce\{([^}]+)\}/g, '$1');
      text = text.replace(/\\text\{([^}]+)\}/g, '$1');
      text = text.replace(/\\quad/g, ' • ');
      text = text.replace(/->/g, ' → ');
      text = text.replace(/\\overline\{([^}]+)\}/g, (_, g) => `${g}\u0305`);
      text = text.replace(/\\bar\{([^}]+)\}/g, (_, g) => `${g}\u0305`);
      text = text.replace(/\\infty/g, '∞');
      text = text.replace(/\\delta/g, 'δ');
      text = text.replace(/\\/g, '');

      // Explicit superscript braces: ^{2+} -> ²⁺
      text = text.replace(/\^\{([^}]+)\}/g, (_, g) => toSup(g));
      // Explicit subscript braces: _{2p} -> ₂ₚ
      text = text.replace(/_\{([^}]+)\}/g, (_, g) => toSub(g));

      // Electron notation like "2 e-" or "1 e-" -> "2 e⁻"
      text = text.replace(/\b(\d+)\s*e-(?!\w)/g, (_, n) => `${n} e⁻`);

      // Trailing ion charges on species: Na+ -> Na⁺, Mg2+ -> Mg²⁺, Cl- -> Cl⁻, O2- -> O²⁻
      text = text.replace(
        /\b([A-Z][a-z]?)(\d*)([+\-−])(?=\s|,|\)|\]|$|[A-Z(])/g,
        (_, el, count, sign) => `${el}${count ? toSub(count) : ''}${toSup(sign)}`
      );

      // Stoichiometric numbers right after element symbols or closing parens: H2O -> H₂O, O2 -> O₂
      text = text.replace(/([A-Za-z)\]])(\d+)/g, (_, prefix, digits) => `${prefix}${toSub(digits)}`);

      return text.trim();
    }

    function buildKatexInput(raw) {
      const str = String(raw || '').trim();
      if (!str) return '';
      // Space/point groups and symmetry symbols render best in math mode rather than \ce{...}
      if (/\\overline|\\bar|\\infty|Fm\\?bar|C_\{2v\}|D_\{|C_\{∞v\}|C_\{(?:\\infty|∞)v\}/.test(str)) {
        return str
          .replace(/\\ce\{([^}]+)\}/g, '$1')
          .replace(/Fm\\?bar\{?3m\}?/g, 'Fm\\overline{3}m')
          .replace(/\\bar\{([^}]+)\}/g, '\\overline{$1}')
          .replace(/∞/g, '\\infty');
      }
      // If it already contains \ce{...}, render it directly with KaTeX mhchem
      if (/\\ce\{/.test(str)) {
        return str.replace(/(\\ce\{[^}]*\})|->/g, (mm, g) => (g ? g : '\\rightarrow '));
      }
      // Otherwise wrap chemical formulas / reaction arrows cleanly for mhchem
      return `\\ce{${str.replace(/->/g, '->')}}`;
    }

    function MathText({ tex, className = '', block = false }) {
      const formatted = useMemo(() => formatChemicalExpression(tex), [tex]);
      const katexSource = useMemo(() => buildKatexInput(tex), [tex]);
      const [katexHtml, setKatexHtml] = useState('');

      useEffect(() => {
        let cancelled = false;
        let attempts = 0;

        const tryRender = () => {
          if (cancelled) return;
          if (window.katex && typeof window.katex.renderToString === 'function') {
            try {
              const html = window.katex.renderToString(katexSource, {
                displayMode: block,
                throwOnError: false,
                strict: false,
              });
              if (!cancelled) setKatexHtml(html);
              return;
            } catch (_) {
              // Fall back to formatted text below
            }
          }
          if (attempts < 12) {
            attempts += 1;
            setTimeout(tryRender, 120);
          }
        };

        tryRender();
        return () => {
          cancelled = true;
        };
      }, [katexSource, block]);

      if (katexHtml) {
        return (
          <span
            className={`${block ? 'block my-1' : 'inline-block align-middle'} text-ink ${className}`}
            dangerouslySetInnerHTML={{ __html: katexHtml }}
          />
        );
      }

      return (
        <span
          className={`${block ? 'block my-1' : 'inline'} font-medium text-ink ${className}`}
        >
          {formatted}
        </span>
      );
    }

    // Helper to render inline text containing \ce{...} or **bold** segments cleanly
    function RichMathText({ text, className = '' }) {
      const segments = useMemo(() => {
        if (!text) return [];
        const rawStr = String(text);
        // If a string contains plain English words alongside \ce{...}, render cleanly via formatted spans
        const hasProseWords = /\b(transferred|electrons|shared|single|double|triple|polar|lattice|band|lone|pairs)\b/i.test(rawStr);
        if (hasProseWords) {
          const parts = rawStr.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
          return parts.map((part) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return { type: 'bold', value: part.slice(2, -2) };
            }
            return { type: 'text', value: formatChemicalExpression(part) };
          });
        }

        // Split on \ce{...} or **bold** while preserving order
        const tokens = rawStr.split(/(\\ce\{[^}]+\}|\*\*[^*]+\*\*)/g).filter(Boolean);
        return tokens.map((token) => {
          if (token.startsWith('\\ce{') && token.endsWith('}')) {
            return { type: 'ce', raw: token };
          }
          if (token.startsWith('**') && token.endsWith('**')) {
            return { type: 'bold', value: token.slice(2, -2) };
          }
          return { type: 'text', value: formatChemicalExpression(token) };
        });
      }, [text]);

      return (
        <span className={className}>
          {segments.map((seg, idx) => {
            if (seg.type === 'ce') {
              return <MathText key={idx} tex={seg.raw} />;
            }
            if (seg.type === 'bold') {
              return (
                <strong key={idx} className="font-semibold text-ink">
                  {formatChemicalExpression(seg.value)}
                </strong>
              );
            }
            return <React.Fragment key={idx}>{seg.value}</React.Fragment>;
          })}
        </span>
      );
    }

    // Renders compact ChemDraw/VSEPR-style structural sketches for each species
    function ChemShapeSketch({ presetId }) {
      const renderSketchContent = () => {
        switch (presetId) {
          case 'h2o':
            // Bent V-shape (O at apex, two H atoms angled downward)
            return (
              <svg viewBox="0 0 110 56" className="w-24 h-12 mx-auto" role="img" aria-label="Bent V-shape of water">
                <line x1="55" y1="15" x2="28" y2="43" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
                <line x1="55" y1="15" x2="82" y2="43" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="55" cy="15" r="10.5" fill="#2563EB" stroke="#1E3A8A" strokeWidth="1.5" />
                <text x="55" y="18.5" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">O</text>
                <circle cx="28" cy="43" r="8.5" fill="#6366F1" stroke="#3730A3" strokeWidth="1.5" />
                <text x="28" y="46.2" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">H</text>
                <circle cx="82" cy="43" r="8.5" fill="#6366F1" stroke="#3730A3" strokeWidth="1.5" />
                <text x="82" y="46.2" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">H</text>
              </svg>
            );
          case 'o2':
            // Linear double-bonded diatomic O=O
            return (
              <svg viewBox="0 0 110 56" className="w-24 h-12 mx-auto" role="img" aria-label="Linear double-bonded oxygen molecule">
                <line x1="40" y1="25" x2="70" y2="25" stroke="#0F766E" strokeWidth="2.2" />
                <line x1="40" y1="31" x2="70" y2="31" stroke="#0F766E" strokeWidth="2.2" />
                <circle cx="30" cy="28" r="10.5" fill="#0F766E" stroke="#115E59" strokeWidth="1.5" />
                <text x="30" y="31.5" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">O</text>
                <circle cx="80" cy="28" r="10.5" fill="#0D9488" stroke="#115E59" strokeWidth="1.5" />
                <text x="80" y="31.5" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">O</text>
              </svg>
            );
          case 'n2':
            // Linear triple-bonded diatomic N≡N
            return (
              <svg viewBox="0 0 110 56" className="w-24 h-12 mx-auto" role="img" aria-label="Linear triple-bonded nitrogen molecule">
                <line x1="40" y1="22.5" x2="70" y2="22.5" stroke="#0F766E" strokeWidth="2" />
                <line x1="40" y1="28" x2="70" y2="28" stroke="#0F766E" strokeWidth="2" />
                <line x1="40" y1="33.5" x2="70" y2="33.5" stroke="#0F766E" strokeWidth="2" />
                <circle cx="30" cy="28" r="10.5" fill="#0F766E" stroke="#115E59" strokeWidth="1.5" />
                <text x="30" y="31.5" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">N</text>
                <circle cx="80" cy="28" r="10.5" fill="#115E59" stroke="#134E4A" strokeWidth="1.5" />
                <text x="80" y="31.5" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">N</text>
              </svg>
            );
          case 'hcl':
            // Linear single bond H–Cl
            return (
              <svg viewBox="0 0 110 56" className="w-24 h-12 mx-auto" role="img" aria-label="Linear hydrogen chloride molecule">
                <line x1="39" y1="28" x2="69" y2="28" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
                <circle cx="30" cy="28" r="9.5" fill="#6366F1" stroke="#3730A3" strokeWidth="1.5" />
                <text x="30" y="31.2" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="700" fontFamily="Inter, sans-serif">H</text>
                <circle cx="80" cy="28" r="11" fill="#2563EB" stroke="#1E3A8A" strokeWidth="1.5" />
                <text x="80" y="31.5" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="700" fontFamily="Inter, sans-serif">Cl</text>
              </svg>
            );
          case 'nacl':
          case 'mgo': {
            // Alternating 2x2 ionic checkerboard pair grid
            const isMgO = presetId === 'mgo';
            const symA = isMgO ? 'Mg' : 'Na';
            const symB = isMgO ? 'O' : 'Cl';
            const colA = '#E11D48';
            const colB = isMgO ? '#BE123C' : '#0D9488';
            return (
              <svg viewBox="0 0 110 56" className="w-24 h-12 mx-auto" role="img" aria-label="Alternating ionic crystal grid">
                <line x1="38" y1="15" x2="72" y2="15" stroke="#94A3B8" strokeWidth="1.6" strokeDasharray="2.5 2" />
                <line x1="38" y1="41" x2="72" y2="41" stroke="#94A3B8" strokeWidth="1.6" strokeDasharray="2.5 2" />
                <line x1="38" y1="15" x2="38" y2="41" stroke="#94A3B8" strokeWidth="1.6" strokeDasharray="2.5 2" />
                <line x1="72" y1="15" x2="72" y2="41" stroke="#94A3B8" strokeWidth="1.6" strokeDasharray="2.5 2" />
                <circle cx="38" cy="15" r="8.5" fill={colA} />
                <text x="38" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="700" fontFamily="Inter, sans-serif">{symA}</text>
                <circle cx="72" cy="15" r="8.5" fill={colB} />
                <text x="72" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="700" fontFamily="Inter, sans-serif">{symB}</text>
                <circle cx="38" cy="41" r="8.5" fill={colB} />
                <text x="38" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="700" fontFamily="Inter, sans-serif">{symB}</text>
                <circle cx="72" cy="41" r="8.5" fill={colA} />
                <text x="72" y="44" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="700" fontFamily="Inter, sans-serif">{symA}</text>
              </svg>
            );
          }
          case 'cu':
          default:
            // Neat packed metal core rows
            return (
              <svg viewBox="0 0 110 56" className="w-24 h-12 mx-auto" role="img" aria-label="Packed metallic lattice">
                <rect x="16" y="6" width="78" height="44" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.2" />
                {[28, 55, 82].map((gx) =>
                  [19, 37].map((gy) => (
                    <g key={`${gx}-${gy}`}>
                      <circle cx={gx} cy={gy} r="7.5" fill="#D97706" stroke="#92400E" strokeWidth="1.2" />
                      <text x={gx} y={gy + 2.8} textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="700" fontFamily="Inter, sans-serif">Cu</text>
                    </g>
                  ))
                )}
              </svg>
            );
        }
      };

      return <div className="mb-1 flex items-center justify-center">{renderSketchContent()}</div>;
    }

    // Renders compact Lewis / electron-pair SVG diagrams for Spark Starter
    function ChemElectronPairSketch({ presetId }) {
      const renderPairContent = () => {
        switch (presetId) {
          case 'nacl':
            // 1 electron transferred from Na to Cl
            return (
              <svg viewBox="0 0 110 56" className="w-24 h-12 mx-auto" role="img" aria-label="One electron transferred from sodium to chlorine">
                <defs>
                  <marker id="arrow-nacl" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#BE123C" />
                  </marker>
                </defs>
                <text x="23" y="33" textAnchor="middle" fill="#E11D48" fontSize="13" fontWeight="700" fontFamily="Inter, sans-serif">Na⁺</text>
                <text x="86" y="33" textAnchor="middle" fill="#0D9488" fontSize="13" fontWeight="700" fontFamily="Inter, sans-serif">Cl⁻</text>
                <path d="M 38 22 Q 55 10 70 22" fill="none" stroke="#BE123C" strokeWidth="1.8" strokeDasharray="3 2" markerEnd="url(#arrow-nacl)" />
                <circle cx="55" cy="15" r="3.6" fill="#BE123C" />
                <text x="55" y="45" textAnchor="middle" fill="#64748B" fontSize="8.5" fontWeight="600" fontFamily="Inter, sans-serif">1 e⁻ jump</text>
              </svg>
            );
          case 'mgo':
            // 2 electrons transferred from Mg to O
            return (
              <svg viewBox="0 0 110 56" className="w-24 h-12 mx-auto" role="img" aria-label="Two electrons transferred from magnesium to oxygen">
                <defs>
                  <marker id="arrow-mgo" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#BE123C" />
                  </marker>
                </defs>
                <text x="22" y="33" textAnchor="middle" fill="#E11D48" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">Mg²⁺</text>
                <text x="88" y="33" textAnchor="middle" fill="#BE123C" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">O²⁻</text>
                <path d="M 39 21 Q 55 9 70 21" fill="none" stroke="#BE123C" strokeWidth="1.8" strokeDasharray="3 2" markerEnd="url(#arrow-mgo)" />
                <circle cx="51" cy="14" r="3.3" fill="#BE123C" />
                <circle cx="59" cy="14" r="3.3" fill="#BE123C" />
                <text x="55" y="45" textAnchor="middle" fill="#64748B" fontSize="8.5" fontWeight="600" fontFamily="Inter, sans-serif">2 e⁻ jump</text>
              </svg>
            );
          case 'h2o':
            // Two shared pairs between H : O : H
            return (
              <svg viewBox="0 0 110 56" className="w-24 h-12 mx-auto" role="img" aria-label="Two shared electron pairs in water">
                <text x="20" y="32" textAnchor="middle" fill="#4F46E5" fontSize="13" fontWeight="700" fontFamily="Inter, sans-serif">H</text>
                <text x="55" y="32" textAnchor="middle" fill="#1D4ED8" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">O</text>
                <text x="90" y="32" textAnchor="middle" fill="#4F46E5" fontSize="13" fontWeight="700" fontFamily="Inter, sans-serif">H</text>
                {/* Left shared pair */}
                <rect x="31" y="19" width="12" height="17" rx="5" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
                <circle cx="37" cy="24.5" r="2.5" fill="#1D4ED8" />
                <circle cx="37" cy="31" r="2.5" fill="#1D4ED8" />
                {/* Right shared pair */}
                <rect x="67" y="19" width="12" height="17" rx="5" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
                <circle cx="73" cy="24.5" r="2.5" fill="#1D4ED8" />
                <circle cx="73" cy="31" r="2.5" fill="#1D4ED8" />
              </svg>
            );
          case 'hcl':
            // One polar shared pair shifted slightly toward Cl
            return (
              <svg viewBox="0 0 110 56" className="w-24 h-12 mx-auto" role="img" aria-label="One shared electron pair shifted toward chlorine">
                <text x="25" y="33" textAnchor="middle" fill="#4F46E5" fontSize="13" fontWeight="700" fontFamily="Inter, sans-serif">H</text>
                <text x="84" y="33" textAnchor="middle" fill="#1D4ED8" fontSize="13" fontWeight="700" fontFamily="Inter, sans-serif">Cl</text>
                <rect x="52" y="19" width="14" height="18" rx="6" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.1" />
                <circle cx="59" cy="24.5" r="2.7" fill="#1D4ED8" />
                <circle cx="59" cy="31.5" r="2.7" fill="#1D4ED8" />
              </svg>
            );
          case 'o2':
            // Two shared electron pairs (4 dots) between O and O
            return (
              <svg viewBox="0 0 110 56" className="w-24 h-12 mx-auto" role="img" aria-label="Two shared electron pairs between oxygen atoms">
                <text x="24" y="33" textAnchor="middle" fill="#0F766E" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">O</text>
                <text x="86" y="33" textAnchor="middle" fill="#0F766E" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">O</text>
                <rect x="42" y="18" width="26" height="20" rx="6" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.1" />
                <circle cx="49" cy="24.5" r="2.6" fill="#0F766E" />
                <circle cx="49" cy="31.5" r="2.6" fill="#0F766E" />
                <circle cx="61" cy="24.5" r="2.6" fill="#0F766E" />
                <circle cx="61" cy="31.5" r="2.6" fill="#0F766E" />
              </svg>
            );
          case 'n2':
            // Three shared electron pairs (6 dots) between N and N
            return (
              <svg viewBox="0 0 110 56" className="w-24 h-12 mx-auto" role="img" aria-label="Three shared electron pairs between nitrogen atoms">
                <text x="22" y="33" textAnchor="middle" fill="#0F766E" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">N</text>
                <text x="88" y="33" textAnchor="middle" fill="#0F766E" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">N</text>
                <rect x="37" y="17" width="36" height="22" rx="6" fill="#CCFBF1" stroke="#0D9488" strokeWidth="1.1" />
                {[44, 55, 66].map((dx) => (
                  <g key={dx}>
                    <circle cx={dx} cy="24.5" r="2.5" fill="#0F766E" />
                    <circle cx={dx} cy="31.5" r="2.5" fill="#0F766E" />
                  </g>
                ))}
              </svg>
            );
          case 'cu':
          default:
            // Roaming electron crowd around Cu+ cores
            return (
              <svg viewBox="0 0 110 56" className="w-24 h-12 mx-auto" role="img" aria-label="Roaming electrons around copper cores">
                <rect x="16" y="8" width="78" height="40" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.1" />
                <circle cx="36" cy="28" r="8" fill="#D97706" />
                <text x="36" y="31" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">Cu⁺</text>
                <circle cx="74" cy="28" r="8" fill="#D97706" />
                <text x="74" y="31" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">Cu⁺</text>
                {[
                  [24, 15],
                  [55, 16],
                  [85, 15],
                  [25, 41],
                  [55, 40],
                  [84, 41],
                ].map(([ex, ey], i) => (
                  <circle key={i} cx={ex} cy={ey} r="2.6" fill="#B45309" />
                ))}
              </svg>
            );
        }
      };

      return <div className="mb-1 flex items-center justify-center">{renderPairContent()}</div>;
    }

    // Renders compact hold-strength / bond-grip SVG diagrams for Spark Starter
    function ChemHoldStrengthSketch({ presetId }) {
      const strengthConfig = {
        mgo: { bars: 5, color: '#BE123C', label: 'Max grid lock' },
        n2: { bars: 5, color: '#0F766E', label: 'Triple grip' },
        nacl: { bars: 4, color: '#E11D48', label: 'Strong ion lock' },
        o2: { bars: 4, color: '#0D9488', label: 'Double grip' },
        h2o: { bars: 3, color: '#1D4ED8', label: 'Firm pull' },
        hcl: { bars: 3, color: '#2563EB', label: 'Steady pull' },
        cu: { bars: 3, color: '#D97706', label: 'Flexi-strong' },
      };

      const cfg = strengthConfig[presetId] || strengthConfig.h2o;

      return (
        <div className="mb-1 flex items-center justify-center">
          <svg
            viewBox="0 0 110 56"
            className="w-24 h-12 mx-auto"
            role="img"
            aria-label={`Hold strength meter: ${cfg.bars} out of 5`}
          >
            {/* Left and right anchor nodes */}
            <circle cx="20" cy="24" r="6" fill={cfg.color} opacity="0.9" />
            <circle cx="90" cy="24" r="6" fill={cfg.color} opacity="0.9" />

            {/* 5 graduated strength bars connecting the anchors */}
            {[0, 1, 2, 3, 4].map((idx) => {
              const active = idx < cfg.bars;
              const bx = 32 + idx * 9.5;
              const bh = 10 + idx * 2.4;
              const by = 24 - bh * 0.5;
              return (
                <rect
                  key={idx}
                  x={bx}
                  y={by}
                  width="6.5"
                  height={bh}
                  rx="2.5"
                  fill={active ? cfg.color : '#E2E8F0'}
                />
              );
            })}

            <text
              x="55"
              y="46"
              textAnchor="middle"
              fill="#64748B"
              fontSize="8.5"
              fontWeight="600"
              fontFamily="Inter, sans-serif"
            >
              {cfg.label}
            </text>
          </svg>
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 3. BOND CLASSIFICATION & PHYSICS HELPER FUNCTIONS
    // -------------------------------------------------------------------------

    function computeBondMetrics(bondType, enA, enB) {
      const deltaEn = Math.abs(enA - enB);
      const rawDiff = enB - enA;
      const asymmetry =
        bondType === 'metallic' || bondType === 'covalent'
          ? Math.max(-0.25, Math.min(0.25, rawDiff / 3.3))
          : Math.max(-1, Math.min(1, rawDiff / 2.2));

      let partialA = '';
      let partialB = '';
      if (bondType === 'ionic') {
        if (enA < enB - 0.15) {
          partialA = '+';
          partialB = '−';
        } else if (enB < enA - 0.15) {
          partialA = '−';
          partialB = '+';
        } else {
          partialA = '+';
          partialB = '−';
        }
      } else if (bondType === 'polar') {
        if (Math.abs(asymmetry) < 0.08) {
          partialA = 'δ+';
          partialB = 'δ−';
        } else if (asymmetry > 0) {
          partialA = 'δ+';
          partialB = 'δ−';
        } else {
          partialA = 'δ−';
          partialB = 'δ+';
        }
      } else if (bondType === 'metallic') {
        partialA = '+';
        partialB = '+';
      }

      return {
        deltaEn,
        asymmetry,
        partialA,
        partialB,
      };
    }

    // -------------------------------------------------------------------------
    // 4. INTERACTIVE HTML5 CANVAS SIMULATION COMPONENT
    // -------------------------------------------------------------------------

    function BondSimulationCanvas({
      level,
      bondType,
      isWaterMolecule,
      atomA,
      atomB,
      enA,
      enB,
      electronView,
      isPlaying,
      bondFormed,
      bondPulseCounter,
      onSetBondFormed,
      onToggleElectronView,
    }) {
      const canvasRef = useRef(null);
      const wrapRef = useRef(null);
      const viewBadgeBoundsRef = useRef(null);

      const simStateRef = useRef({
        level,
        bondType,
        isWaterMolecule,
        atomA,
        atomB,
        enA,
        enB,
        electronView,
        isPlaying,
        bondFormed,
        onToggleElectronView,
        separationFactor: 0.48,
        separationVel: 0,
        transferProgress: 0,
        time: 0,
        draggingAtom: null,
        dragDidMove: false,
        hoverAtom: null,
        atomPosA: { x: 0, y: 0, r: 30 },
        atomPosB: { x: 0, y: 0, r: 30 },
        atomPosC: { x: 0, y: 0, r: 24 },
        ripples: [],
        popA: 0,
        popB: 0,
        popC: 0,
        callout: null,
        trails: {
          shared: [[], [], [], [], [], []],
          orbitA: [[], [], [], [], [], [], []],
          orbitB: [[], [], [], [], [], [], []],
          orbitC: [[], []],
          sea: Array.from({ length: 20 }, () => []),
        },
        seaElectrons: Array.from({ length: 20 }, (_, i) => ({
          u: (i * 0.19) % 1,
          v: (i * 0.37) % 1,
          speedX: 0.08 + (i % 5) * 0.025,
          phase: i * 0.8,
        })),
      });

      const triggerFeedback = useCallback((type, x, y, text, color) => {
        const s = simStateRef.current;
        s.ripples.push({
          x,
          y,
          r: 16,
          maxR: 92,
          alpha: 0.75,
          color: color || '#1D4ED8',
        });
        if (type === 'A') s.popA = 1.0;
        if (type === 'B') s.popB = 1.0;
        if (type === 'C') s.popC = 1.0;
        if (type === 'both') {
          s.popA = 0.85;
          s.popB = 0.85;
          s.popC = 0.85;
        }
        if (text) {
          s.callout = {
            text,
            x,
            y: y - 54,
            alpha: 1.0,
            color: color || '#161A22',
          };
        }
      }, []);

      useEffect(() => {
        const prevType = simStateRef.current.bondType;
        const prevWater = simStateRef.current.isWaterMolecule;
        simStateRef.current.level = level;
        simStateRef.current.bondType = bondType;
        simStateRef.current.isWaterMolecule = isWaterMolecule;
        simStateRef.current.atomA = atomA;
        simStateRef.current.atomB = atomB;
        simStateRef.current.enA = enA;
        simStateRef.current.enB = enB;
        simStateRef.current.electronView = electronView;
        simStateRef.current.isPlaying = isPlaying;
        simStateRef.current.bondFormed = bondFormed;
        simStateRef.current.onToggleElectronView = onToggleElectronView;

        if (prevType !== bondType || prevWater !== isWaterMolecule) {
          simStateRef.current.trails.shared = [[], [], [], [], [], []];
          simStateRef.current.trails.orbitA = [[], [], [], [], [], [], []];
          simStateRef.current.trails.orbitB = [[], [], [], [], [], [], []];
          simStateRef.current.trails.orbitC = [[], []];
        }
      }, [level, bondType, isWaterMolecule, atomA, atomB, enA, enB, electronView, isPlaying, bondFormed, onToggleElectronView]);

      // Kick spring velocity and micro-feedback when bond forms or stretches
      useEffect(() => {
        if (bondPulseCounter > 0) {
          const s = simStateRef.current;
          const bondMeta = BOND_TYPES[s.bondType] || BOND_TYPES.polar;
          s.separationVel += s.bondFormed ? -2.4 : 2.5;
          const midX = (s.atomPosA.x + s.atomPosB.x) * 0.5 || 200;
          const midY = (s.atomPosA.y + s.atomPosB.y) * 0.5 || 180;

          if (s.bondFormed) {
            const formMsg =
              s.level === 'elementary'
                ? 'Bond locked in!'
                : s.level === 'ug'
                ? 'Bond formed!'
                : 'Bond formed!';
            triggerFeedback('both', midX, midY - 12, formMsg, bondMeta.accent);
          } else {
            const breakMsg =
              s.level === 'elementary'
                ? 'Atoms pulled apart!'
                : s.level === 'ug'
                ? 'Bond pulled apart'
                : 'Bond separated';
            triggerFeedback('both', midX, midY - 10, breakMsg, '#525B6E');
          }
        }
      }, [bondPulseCounter, triggerFeedback]);

      // Pointer drag-to-bond & tap interaction
      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const getLocalPos = (e) => {
          const rect = canvas.getBoundingClientRect();
          return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            w: rect.width,
            h: rect.height,
          };
        };

        const handlePointerDown = (e) => {
          const pos = getLocalPos(e);
          const s = simStateRef.current;

          // Allow clicking the top-right View badge directly inside the canvas
          const vb = viewBadgeBoundsRef.current;
          if (
            vb &&
            pos.x >= vb.x &&
            pos.x <= vb.x + vb.w &&
            pos.y >= vb.y &&
            pos.y <= vb.y + vb.h
          ) {
            s.onToggleElectronView?.();
            return;
          }

          const distA = Math.hypot(pos.x - s.atomPosA.x, pos.y - s.atomPosA.y);
          const distB = Math.hypot(pos.x - s.atomPosB.x, pos.y - s.atomPosB.y);
          const distC = s.isWaterMolecule
            ? Math.hypot(pos.x - s.atomPosC.x, pos.y - s.atomPosC.y)
            : Infinity;
          const hitPad = 24;

          if (distA <= s.atomPosA.r + hitPad && distA <= distB && distA <= distC) {
            s.draggingAtom = 'A';
            s.dragDidMove = false;
            canvas.setPointerCapture?.(e.pointerId);
          } else if (distB <= s.atomPosB.r + hitPad && distB <= distC) {
            s.draggingAtom = 'B';
            s.dragDidMove = false;
            canvas.setPointerCapture?.(e.pointerId);
          } else if (s.isWaterMolecule && distC <= s.atomPosC.r + hitPad) {
            s.draggingAtom = 'C';
            s.dragDidMove = false;
            canvas.setPointerCapture?.(e.pointerId);
          }
        };

        const handlePointerMove = (e) => {
          const pos = getLocalPos(e);
          const s = simStateRef.current;

          if (!s.draggingAtom) {
            const distA = Math.hypot(pos.x - s.atomPosA.x, pos.y - s.atomPosA.y);
            const distB = Math.hypot(pos.x - s.atomPosB.x, pos.y - s.atomPosB.y);
            const distC = s.isWaterMolecule
              ? Math.hypot(pos.x - s.atomPosC.x, pos.y - s.atomPosC.y)
              : Infinity;
            if (distA <= s.atomPosA.r + 18) s.hoverAtom = 'A';
            else if (distB <= s.atomPosB.r + 18) s.hoverAtom = 'B';
            else if (s.isWaterMolecule && distC <= s.atomPosC.r + 18) s.hoverAtom = 'C';
            else if (
              viewBadgeBoundsRef.current &&
              pos.x >= viewBadgeBoundsRef.current.x &&
              pos.x <= viewBadgeBoundsRef.current.x + viewBadgeBoundsRef.current.w &&
              pos.y >= viewBadgeBoundsRef.current.y &&
              pos.y <= viewBadgeBoundsRef.current.y + viewBadgeBoundsRef.current.h
            ) {
              s.hoverAtom = 'viewToggle';
            }
            else s.hoverAtom = null;
            canvas.style.cursor = s.hoverAtom ? 'pointer' : 'default';
            return;
          }

          canvas.style.cursor = 'grabbing';
          s.dragDidMove = true;
          const cx = pos.w * 0.5;
          const cy = pos.h * 0.52;
          const minSep = Math.min(pos.w * 0.13, 66);
          const maxSep = Math.min(pos.w * 0.35, 195);

          let halfDist;
          if (s.isWaterMolecule) {
            if (s.draggingAtom === 'B') {
              const dy = pos.y - (cy - 18);
              halfDist = Math.max(minSep, Math.min(maxSep, minSep - dy * 1.4));
            } else {
              const dx = Math.abs(pos.x - cx);
              halfDist = Math.max(minSep, Math.min(maxSep, dx / 0.82));
            }
          } else {
            const dx = s.draggingAtom === 'A' ? cx - pos.x : pos.x - cx;
            halfDist = Math.max(minSep, Math.min(maxSep, dx));
          }
          const newFactor = Math.max(0, Math.min(1, (halfDist - minSep) / (maxSep - minSep)));
          s.separationFactor = newFactor;
          s.separationVel = 0;

          if (!s.bondFormed && newFactor < 0.34) {
            s.bondFormed = true;
            if (s.bondType === 'ionic') s.transferProgress = 0.04;
            onSetBondFormed(true);
            const snapText =
              s.level === 'elementary'
                ? 'Snapped into bond!'
                : s.level === 'ug'
                ? 'Snapped into bond!'
                : 'Bond formed!';
            triggerFeedback('both', cx, cy - 12, snapText, '#0F766E');
          } else if (s.bondFormed && newFactor > 0.76) {
            s.bondFormed = false;
            onSetBondFormed(false);
            const stretchText =
              s.level === 'elementary'
                ? 'Pulled apart!'
                : s.level === 'ug'
                ? 'Pulled apart!'
                : 'Bond stretched apart';
            triggerFeedback('both', cx, cy - 12, stretchText, '#BE123C');
          }
        };

        const handlePointerUp = (e) => {
          const s = simStateRef.current;
          if (s.draggingAtom) {
            const wasClick = !s.dragDidMove;
            s.draggingAtom = null;
            canvas.style.cursor = 'grab';
            canvas.releasePointerCapture?.(e.pointerId);
            if (wasClick) {
              onSetBondFormed(!s.bondFormed);
            }
          }
        };

        const blockScrollWhileDragging = (e) => { if (simStateRef.current.draggingAtom) e.preventDefault(); };
        canvas.addEventListener('touchmove', blockScrollWhileDragging, { passive: false });
        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointermove', handlePointerMove);
        canvas.addEventListener('pointerup', handlePointerUp);
        canvas.addEventListener('pointercancel', handlePointerUp);

        return () => {
          canvas.removeEventListener('touchmove', blockScrollWhileDragging);
          canvas.removeEventListener('pointerdown', handlePointerDown);
          canvas.removeEventListener('pointermove', handlePointerMove);
          canvas.removeEventListener('pointerup', handlePointerUp);
          canvas.removeEventListener('pointercancel', handlePointerUp);
        };
      }, [onSetBondFormed, triggerFeedback]);

      // ResizeObserver + RAF loop
      useEffect(() => {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return;
        const ctx = canvas.getContext('2d');

        let width = 0;
        let height = 0;
        const updateCanvasSize = () => {
          const rect = wrap.getBoundingClientRect();
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          width = Math.max(280, Math.floor(rect.width));
          height = Math.max(280, Math.floor(rect.height));
          canvas.width = Math.floor(width * dpr);
          canvas.height = Math.floor(height * dpr);
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        updateCanvasSize();
        const observer = new ResizeObserver(updateCanvasSize);
        observer.observe(wrap);

        let lastTime = performance.now();
        let rafId;

        const render = (now) => {
          const rawDt = (now - lastTime) / 1000;
          lastTime = now;
          const dt = Math.min(rawDt, 0.05);

          const s = simStateRef.current;
          if (s.isPlaying) {
            s.time += dt;
          }

          if (s.draggingAtom === null) {
            const targetSep = s.bondFormed ? 0.16 : 0.78;
            const stiffness = 18;
            const damping = 7.2;
            const accel =
              (targetSep - s.separationFactor) * stiffness - s.separationVel * damping;
            s.separationVel += accel * dt;
            s.separationFactor += s.separationVel * dt;
            s.separationFactor = Math.max(0.02, Math.min(1.0, s.separationFactor));
          }

          const prevTransfer = s.transferProgress;
          if (s.bondType === 'ionic' && s.bondFormed) {
            if (s.isPlaying) {
              s.transferProgress = Math.min(1, s.transferProgress + dt * 1.25);
            }
            if (prevTransfer < 0.98 && s.transferProgress >= 0.98) {
              const targetB = s.enB >= s.enA;
              const recvPos = targetB ? s.atomPosB : s.atomPosA;
              const midX = (s.atomPosA.x + s.atomPosB.x) * 0.5 || recvPos.x;
              const ionicMsg =
                s.level === 'elementary'
                  ? 'Electron captured!'
                  : s.level === 'ug'
                  ? 'Electron transferred!'
                  : 'Anion (−) formed!';
              triggerFeedback(
                targetB ? 'B' : 'A',
                midX,
                recvPos.y - 34,
                ionicMsg,
                '#BE123C'
              );
            }
          } else {
            s.transferProgress = Math.max(0, s.transferProgress - dt * 1.8);
          }

          s.popA = Math.max(0, s.popA - dt * 2.8);
          s.popB = Math.max(0, s.popB - dt * 2.8);
          s.popC = Math.max(0, s.popC - dt * 2.8);
          for (let i = s.ripples.length - 1; i >= 0; i--) {
            const rp = s.ripples[i];
            rp.r += dt * 135;
            rp.alpha -= dt * 1.25;
            if (rp.alpha <= 0 || rp.r >= rp.maxR) {
              s.ripples.splice(i, 1);
            }
          }
          if (s.callout) {
            s.callout.y -= dt * 14;
            s.callout.alpha -= dt * 0.62;
            if (s.callout.alpha <= 0) s.callout = null;
          }

          drawScene(ctx, width, height, s, viewBadgeBoundsRef);
          rafId = requestAnimationFrame(render);
        };

        rafId = requestAnimationFrame(render);

        return () => {
          cancelAnimationFrame(rafId);
          observer.disconnect();
        };
      }, [triggerFeedback]);

      return (
        <div
          ref={wrapRef}
          className="sim-canvas-wrap rounded-2xl border border-line bg-white shadow-sm overflow-hidden"
        >
          <canvas
            ref={canvasRef}
            className="bond-canvas"
            aria-label="Interactive chemical bond simulation canvas. Drag atoms closer together or pull them apart."
          />
        </div>
      );
    }

    // -------------------------------------------------------------------------
    // 5. CANVAS DRAWING ROUTINES (METABALL CLOUDS, TRAILS, Ripples & AURAS)
    // -------------------------------------------------------------------------

    function pushTrailPoint(trailArr, x, y, maxLen = 10) {
      if (!trailArr) return;
      trailArr.push({ x, y });
      if (trailArr.length > maxLen) {
        trailArr.shift();
      }
    }

    function drawElectronWithTrail(ctx, x, y, trailArr, color, radius = 4.6) {
      if (trailArr && trailArr.length > 1) {
        for (let i = 0; i < trailArr.length - 1; i++) {
          const p0 = trailArr[i];
          const p1 = trailArr[i + 1];
          const ratio = (i + 1) / trailArr.length;
          ctx.save();
          ctx.strokeStyle = color;
          ctx.globalAlpha = ratio * 0.28;
          ctx.lineWidth = Math.max(1.2, radius * ratio * 0.9);
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
          ctx.restore();
        }
      }
      drawElectronDot(ctx, x, y, color, radius);
    }

    function drawMetaballCloud(ctx, x1, y1, r1, x2, y2, r2, fillStyle, strokeStyle) {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const d = Math.hypot(dx, dy);
      const maxSpan = (r1 + r2) * 1.38;

      ctx.save();
      ctx.fillStyle = fillStyle;
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = 1.6;

      if (d <= Math.abs(r1 - r2) || d < 4) {
        const bigR = Math.max(r1, r2);
        const bx = r1 >= r2 ? x1 : x2;
        const by = r1 >= r2 ? y1 : y2;
        ctx.beginPath();
        ctx.arc(bx, by, bigR, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        return;
      }

      if (d >= maxSpan) {
        ctx.beginPath();
        ctx.arc(x1, y1, r1, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x2, y2, r2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        return;
      }

      const angle = Math.atan2(dy, dx);
      const clampCos = (v) => Math.max(-1, Math.min(1, v));
      const u1 = Math.acos(clampCos((r1 * r1 + d * d - r2 * r2) / (2 * r1 * d)));
      const u2 = Math.acos(clampCos((r2 * r2 + d * d - r1 * r1) / (2 * r2 * d)));

      const spread = 0.56;
      const a1a = angle + u1 + (Math.PI - u1) * spread;
      const a1b = angle - u1 - (Math.PI - u1) * spread;
      const a2a = angle + Math.PI - u2 - (Math.PI - u2) * spread;
      const a2b = angle + Math.PI + u2 + (Math.PI - u2) * spread;

      const p1a = { x: x1 + r1 * Math.cos(a1a), y: y1 + r1 * Math.sin(a1a) };
      const p1b = { x: x1 + r1 * Math.cos(a1b), y: y1 + r1 * Math.sin(a1b) };
      const p2a = { x: x2 + r2 * Math.cos(a2a), y: y2 + r2 * Math.sin(a2a) };
      const p2b = { x: x2 + r2 * Math.cos(a2b), y: y2 + r2 * Math.sin(a2b) };

      const handleLen = d * 0.36;
      const c1a = {
        x: p1a.x + handleLen * Math.cos(a1a - Math.PI * 0.5),
        y: p1a.y + handleLen * Math.sin(a1a - Math.PI * 0.5),
      };
      const c2a = {
        x: p2a.x + handleLen * Math.cos(a2a + Math.PI * 0.5),
        y: p2a.y + handleLen * Math.sin(a2a + Math.PI * 0.5),
      };
      const c2b = {
        x: p2b.x + handleLen * Math.cos(a2b - Math.PI * 0.5),
        y: p2b.y + handleLen * Math.sin(a2b - Math.PI * 0.5),
      };
      const c1b = {
        x: p1b.x + handleLen * Math.cos(a1b + Math.PI * 0.5),
        y: p1b.y + handleLen * Math.sin(a1b + Math.PI * 0.5),
      };

      ctx.beginPath();
      ctx.arc(x1, y1, r1, a1a, a1b, false);
      ctx.bezierCurveTo(c1b.x, c1b.y, c2b.x, c2b.y, p2b.x, p2b.y);
      ctx.arc(x2, y2, r2, a2b, a2a, false);
      ctx.bezierCurveTo(c2a.x, c2a.y, c1a.x, c1a.y, p1a.x, p1a.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    function drawChargeAura(ctx, x, y, radius, chargeType) {
      if (!chargeType) return;
      const isPos = chargeType === '+' || chargeType === 'δ+';
      const innerColor = isPos ? 'rgba(59, 130, 246, 0.24)' : 'rgba(244, 63, 94, 0.24)';
      const grad = ctx.createRadialGradient(x, y, radius * 0.4, x, y, radius * 1.9);
      grad.addColorStop(0, innerColor);
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.save();
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius * 1.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawRipples(ctx, ripples) {
      ripples.forEach((rp) => {
        ctx.save();
        ctx.strokeStyle = rp.color;
        ctx.globalAlpha = Math.max(0, rp.alpha);
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });
    }

    function drawFloatingCallout(ctx, callout, canvasWidth) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, callout.alpha));
      ctx.font = '600 12px Inter, sans-serif';
      const padX = 14;
      const textW = ctx.measureText(callout.text).width;
      const boxW = textW + padX * 2;
      const boxH = 30;
      const clampedX = Math.max(
        boxW * 0.5 + 14,
        Math.min(canvasWidth - boxW * 0.5 - 14, callout.x)
      );
      const clampedY = Math.max(54, callout.y);

      ctx.shadowColor = 'rgba(15, 23, 42, 0.12)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;

      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = callout.color;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.roundRect(clampedX - boxW * 0.5, clampedY - boxH * 0.5, boxW, boxH, 999);
      ctx.fill();

      ctx.shadowColor = 'transparent';
      ctx.stroke();

      ctx.fillStyle = callout.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(callout.text, clampedX, clampedY + 0.5);
      ctx.restore();
    }

    function drawScene(ctx, w, h, s, viewBadgeBoundsRef) {
      ctx.clearRect(0, 0, w, h);

      // Subtle architectural blueprint dot grid
      ctx.fillStyle = '#EAE6DF';
      const step = 28;
      for (let gx = step; gx < w; gx += step) {
        for (let gy = step; gy < h; gy += step) {
          ctx.beginPath();
          ctx.arc(gx, gy, 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (s.bondType === 'metallic') {
        drawMetallicScene(ctx, w, h, s);
      } else if (s.isWaterMolecule && s.bondType === 'polar') {
        drawWaterBentScene(ctx, w, h, s);
      } else {
        drawDiatomicScene(ctx, w, h, s);
      }

      drawRipples(ctx, s.ripples);

      // Top-left live status badge
      // Top-right view mode toggle indicator
      ctx.save();
      ctx.font = '500 11px Inter, sans-serif';
      const viewLabel =
        s.electronView === 'shells'
          ? 'View: Valence Shells ↻'
          : 'View: Liquid Cloud ↻';
      const vw = ctx.measureText(viewLabel).width + 22;
      const vx = w - vw - 14;
      const vy = 14;
      const vh = 28;
      if (viewBadgeBoundsRef) {
        viewBadgeBoundsRef.current = { x: vx, y: vy, w: vw, h: vh };
      }
      ctx.fillStyle = s.hoverAtom === 'viewToggle' ? '#F3F4F6' : '#FAF8F5';
      ctx.strokeStyle = s.hoverAtom === 'viewToggle' ? '#161A22' : '#E4E0D8';
      ctx.beginPath();
      ctx.roundRect(vx, vy, vw, vh, 999);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#161A22';
      ctx.fillText(viewLabel, vx + 11, vy + 18);
      ctx.restore();

      if (s.callout) {
        drawFloatingCallout(ctx, s.callout, w);
      }

      // Bottom interactive hint
      ctx.save();
      ctx.font = '500 11px Inter, sans-serif';
      ctx.fillStyle = '#6B7280';
      ctx.textAlign = 'center';
      const hintText =
        s.bondType === 'metallic'
          ? 'Tap canvas to toggle delocalized electron sea'
          : s.isWaterMolecule && s.bondType === 'polar'
          ? 'Drag any H or O atom together or apart • Tap to toggle bond'
          : 'Drag either atom closer to bond or pull apart • Tap to toggle';
      ctx.fillText(hintText, w * 0.5, h - 12);
      ctx.restore();
    }

    function drawWaterBentScene(ctx, w, h, s) {
      const cx = w * 0.5;
      const cy = h * 0.52;
      const minSep = Math.min(w * 0.14, 66);
      const maxSep = Math.min(w * 0.34, 175);
      const bondLen = minSep + (maxSep - minSep) * s.separationFactor;
      const breathe = s.bondFormed ? Math.sin(s.time * 4.4) * 2.1 : 0;

      const ox = cx;
      const oy = cy - 22 + breathe * 0.4;
      const halfAngleRad = (104.5 * 0.5 * Math.PI) / 180;
      const leg = bondLen + 14 + breathe;

      const h1x = ox - Math.sin(halfAngleRad) * leg;
      const h1y = oy + Math.cos(halfAngleRad) * leg;
      const h2x = ox + Math.sin(halfAngleRad) * leg;
      const h2y = oy + Math.cos(halfAngleRad) * leg;

      const rO = Math.min(34, Math.max(25, w * 0.068)) + s.popB * 5;
      const rH = Math.min(24, Math.max(19, w * 0.048)) + s.popA * 4;

      s.atomPosB = { x: ox, y: oy, r: rO };
      s.atomPosA = { x: h1x, y: h1y, r: rH };
      s.atomPosC = { x: h2x, y: h2y, r: rH };

      const metrics = computeBondMetrics('polar', s.enA, s.enB);
      const oNeg = s.enB >= s.enA;
      const skew = Math.max(0.15, Math.min(0.85, 0.5 + metrics.asymmetry * 0.36));

      if (!s.bondFormed && s.separationFactor < 0.55) {
        ctx.save();
        ctx.strokeStyle = 'rgba(29, 78, 216, 0.32)';
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ox, oy, rO + 34, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      if (s.bondFormed) {
        drawChargeAura(ctx, ox, oy, rO, oNeg ? 'δ−' : 'δ+');
        drawChargeAura(ctx, h1x, h1y, rH, oNeg ? 'δ+' : 'δ−');
        drawChargeAura(ctx, h2x, h2y, rH, oNeg ? 'δ+' : 'δ−');
      }

      if (s.electronView === 'cloud') {
        const cloudO = rO * (1.85 + Math.abs(metrics.asymmetry) * 0.25);
        const cloudH = rH * (1.65 - Math.abs(metrics.asymmetry) * 0.18);
        drawMetaballCloud(
          ctx,
          h1x,
          h1y,
          cloudH,
          ox,
          oy,
          cloudO,
          'rgba(37, 99, 235, 0.14)',
          'rgba(37, 99, 235, 0.38)'
        );
        drawMetaballCloud(
          ctx,
          h2x,
          h2y,
          cloudH,
          ox,
          oy,
          cloudO,
          'rgba(37, 99, 235, 0.14)',
          'rgba(37, 99, 235, 0.38)'
        );
      } else {
        ctx.save();
        ctx.strokeStyle = s.bondFormed ? 'rgba(37, 99, 235, 0.38)' : 'rgba(148, 163, 184, 0.28)';
        ctx.lineWidth = s.bondFormed ? 1.8 : 1.3;
        if (!s.bondFormed) ctx.setLineDash([5, 5]);

        ctx.beginPath();
        ctx.arc(ox, oy, rO + 16, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(h1x, h1y, rH + 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(h2x, h2y, rH + 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      if (s.bondFormed) {
        [
          [h1x, h1y],
          [h2x, h2y],
        ].forEach(([hx, hy]) => {
          ctx.save();
          const grad = ctx.createLinearGradient(hx, hy, ox, oy);
          grad.addColorStop(0, 'rgba(99, 102, 241, 0.18)');
          grad.addColorStop(1, 'rgba(37, 99, 235, 0.52)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 7;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(hx, hy);
          ctx.lineTo(ox, oy);
          ctx.stroke();
          ctx.restore();
        });

        const midBottomY = (h1y + h2y) * 0.5 + 16;
        const dipoleLabel =
          s.level === 'elementary'
            ? 'Oxygen pulls electrons closer (δ−)'
            : s.level === 'ug'
            ? 'Overall pull toward O (δ−)'
            : 'Net Dipole (104.5° bent)';
        drawDipoleArrow(ctx, ox, oNeg ? midBottomY : oy - rO - 38, ox, oNeg ? oy - rO - 38 : midBottomY, '#1D4ED8', dipoleLabel);
      }

      // Oxygen's 2 lone pairs
      const loneAngles = [-Math.PI * 0.68, -Math.PI * 0.32];
      loneAngles.forEach((ang, lpIdx) => {
        const lx = ox + Math.cos(ang) * (rO + 14);
        const ly = oy + Math.sin(ang) * (rO + 14);
        const perp = ang + Math.PI * 0.5;
        const wob = Math.sin(s.time * 3 + lpIdx) * 1.5;
        drawElectronDot(ctx, lx + Math.cos(perp) * (4 + wob), ly + Math.sin(perp) * (4 + wob), '#1D4ED8', 4.1);
        drawElectronDot(ctx, lx - Math.cos(perp) * (4 + wob), ly - Math.sin(perp) * (4 + wob), '#1D4ED8', 4.1);
      });

      // Shared bonding pairs along O–H1 and O–H2
      const legs = [
        { hx: h1x, hy: h1y, trailOffset: 0, phaseOffset: 0 },
        { hx: h2x, hy: h2y, trailOffset: 2, phaseOffset: Math.PI * 0.5 },
      ];

      legs.forEach(({ hx, hy, trailOffset, phaseOffset }) => {
        if (s.bondFormed) {
          const shareX = hx + (ox - hx) * skew;
          const shareY = hy + (oy - hy) * skew;
          const dx = ox - hx;
          const dy = oy - hy;
          const len = Math.hypot(dx, dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const osc = Math.sin(s.time * 4.2 + phaseOffset) * 6.5;

          const e1x = shareX + nx * (4.5 + osc * 0.3);
          const e1y = shareY + ny * (4.5 + osc * 0.3);
          const e2x = shareX - nx * (4.5 + osc * 0.3);
          const e2y = shareY - ny * (4.5 + osc * 0.3);

          if (s.isPlaying) {
            pushTrailPoint(s.trails.shared[trailOffset], e1x, e1y, 8);
            pushTrailPoint(s.trails.shared[trailOffset + 1], e2x, e2y, 8);
          }
          drawElectronWithTrail(ctx, e1x, e1y, s.trails.shared[trailOffset], '#1D4ED8', 4.5);
          drawElectronWithTrail(ctx, e2x, e2y, s.trails.shared[trailOffset + 1], '#1D4ED8', 4.5);
        } else {
          const ang = s.time * 2.4 + phaseOffset;
          const ex = hx + Math.cos(ang) * (rH + 12);
          const ey = hy + Math.sin(ang) * (rH + 12);
          if (s.isPlaying) {
            pushTrailPoint(s.trails.shared[trailOffset], ex, ey, 7);
          }
          drawElectronWithTrail(ctx, ex, ey, s.trails.shared[trailOffset], '#6366F1', 4.3);
        }
      });

      const subO =
        s.level === 'elementary'
          ? `Pull ${s.enB.toFixed(1)} (χ)`
          : `χ ${s.enB.toFixed(2)}`;
      const subH =
        s.level === 'elementary'
          ? `Pull ${s.enA.toFixed(1)} (χ)`
          : `χ ${s.enA.toFixed(2)}`;

      drawAtomCircle(ctx, ox, oy, rO, s.atomB.symbol, subO, s.atomB.color, s.hoverAtom === 'B' || s.draggingAtom === 'B');
      drawAtomCircle(ctx, h1x, h1y, rH, 'H', subH, s.atomA.color, s.hoverAtom === 'A' || s.draggingAtom === 'A');
      drawAtomCircle(ctx, h2x, h2y, rH, 'H', subH, s.atomA.color, s.hoverAtom === 'C' || s.draggingAtom === 'C');

      if (s.bondFormed) {
        drawChargePill(ctx, ox, oy - rO - 20, oNeg ? 'δ−' : 'δ+', '#1D4ED8');
        drawChargePill(ctx, h1x, h1y + rH + 18, oNeg ? 'δ+' : 'δ−', '#4F46E5');
        drawChargePill(ctx, h2x, h2y + rH + 18, oNeg ? 'δ+' : 'δ−', '#4F46E5');
      }
    }

    function drawDiatomicScene(ctx, w, h, s) {
      const cx = w * 0.5;
      const cy = h * 0.52;
      const minSep = Math.min(w * 0.13, 66);
      const maxSep = Math.min(w * 0.35, 195);
      const baseHalfDist = minSep + (maxSep - minSep) * s.separationFactor;
      const breathe = s.bondFormed ? Math.sin(s.time * 4.5) * 2.4 : 0;
      const halfDist = baseHalfDist + breathe;

      const ax = cx - halfDist;
      const bx = cx + halfDist;
      const ay = cy;
      const by = cy;

      const baseR = Math.min(34, Math.max(24, w * 0.068));
      const rA = baseR + s.popA * 5;
      const rB = baseR + s.popB * 5;
      s.atomPosA = { x: ax, y: ay, r: rA };
      s.atomPosB = { x: bx, y: by, r: rB };

      const metrics = computeBondMetrics(s.bondType, s.enA, s.enB);
      const meta = BOND_TYPES[s.bondType];

      if (!s.bondFormed && s.separationFactor < 0.55) {
        ctx.save();
        ctx.strokeStyle = 'rgba(29, 78, 216, 0.35)';
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.arc(ax, ay, rA + 34, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(bx, by, rB + 34, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      if (s.bondFormed) {
        drawChargeAura(ctx, ax, ay, rA, metrics.partialA);
        drawChargeAura(ctx, bx, by, rB, metrics.partialB);
      }

      if (s.electronView === 'cloud') {
        const skew = metrics.asymmetry;
        const radiusA =
          s.bondType === 'ionic' && s.bondFormed
            ? rA * (1.55 - 0.35 * s.transferProgress)
            : rA * (1.9 - skew * 0.42);
        const radiusB =
          s.bondType === 'ionic' && s.bondFormed
            ? rB * (1.65 + 0.55 * s.transferProgress)
            : rB * (1.9 + skew * 0.42);

        const fillCol =
          s.bondType === 'ionic'
            ? 'rgba(190, 18, 60, 0.13)'
            : s.bondType === 'polar'
            ? 'rgba(29, 78, 216, 0.13)'
            : 'rgba(15, 118, 110, 0.13)';
        const strokeCol =
          s.bondType === 'ionic'
            ? 'rgba(190, 18, 60, 0.36)'
            : s.bondType === 'polar'
            ? 'rgba(29, 78, 216, 0.38)'
            : 'rgba(15, 118, 110, 0.38)';

        drawMetaballCloud(ctx, ax, ay, radiusA, bx, by, radiusB, fillCol, strokeCol);
      } else {
        ctx.save();
        ctx.strokeStyle = s.bondFormed ? 'rgba(71, 85, 105, 0.34)' : 'rgba(148, 163, 184, 0.28)';
        ctx.lineWidth = s.bondFormed ? 1.8 : 1.4;
        if (!s.bondFormed) ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(ax, ay, rA + 18, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(bx, by, rB + 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      if (s.bondFormed && (s.bondType === 'covalent' || s.bondType === 'polar')) {
        const shareCenterX = cx + halfDist * 0.42 * metrics.asymmetry;
        ctx.save();
        const grad = ctx.createLinearGradient(ax, ay, bx, by);
        if (s.bondType === 'covalent') {
          grad.addColorStop(0, 'rgba(15, 118, 110, 0.12)');
          grad.addColorStop(0.5, 'rgba(15, 118, 110, 0.45)');
          grad.addColorStop(1, 'rgba(15, 118, 110, 0.12)');
        } else {
          const stopPos = Math.max(0.2, Math.min(0.8, 0.5 + metrics.asymmetry * 0.35));
          grad.addColorStop(0, 'rgba(29, 78, 216, 0.10)');
          grad.addColorStop(stopPos, 'rgba(29, 78, 216, 0.52)');
          grad.addColorStop(1, 'rgba(29, 78, 216, 0.14)');
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.bondType === 'covalent' ? 9 : 7;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();

        ctx.fillStyle = meta.accent;
        ctx.globalAlpha = 0.24;
        ctx.beginPath();
        ctx.arc(shareCenterX, cy, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (s.bondType === 'ionic' && s.bondFormed) {
        const targetIsB = s.enB >= s.enA;
        const startX = targetIsB ? ax + rA + 18 : bx - rB - 18;
        const endX = targetIsB ? bx - rB - 18 : ax + rA + 18;

        ctx.save();
        ctx.strokeStyle = 'rgba(190, 18, 60, 0.58)';
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(startX, cy - 28);
        ctx.quadraticCurveTo(cx, cy - 64, endX, cy - 28);
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.font = '600 11px Inter, sans-serif';
        ctx.fillStyle = '#BE123C';
        ctx.textAlign = 'center';
        const ionicCaption =
          s.level === 'elementary'
            ? 'Opposite charges attract!'
            : s.level === 'ug'
            ? 'Opposite charges attract!'
            : 'Electrostatic attraction';
        ctx.fillText(ionicCaption, cx, cy + rA + 44);
        ctx.restore();
      }

      if (s.bondType === 'polar' && s.bondFormed) {
        const arrowLeft = ax + 8;
        const arrowRight = bx - 8;
        const arrowY = cy + rA + 36;
        const pointsRight = metrics.asymmetry >= 0;
        const dipoleCaption =
          s.level === 'elementary'
            ? 'Electrons pulled toward stronger atom'
            : s.level === 'ug'
            ? 'Shared cloud pulled toward stronger atom'
            : 'Bond dipole (δ+ → δ−)';
        drawDipoleArrow(
          ctx,
          pointsRight ? arrowLeft : arrowRight,
          arrowY,
          pointsRight ? arrowRight : arrowLeft,
          arrowY,
          '#1D4ED8',
          dipoleCaption
        );
      }

      drawValenceElectrons(ctx, ax, ay, rA, bx, by, rB, s, metrics);

      const subA =
        s.level === 'elementary'
          ? `Pull ${s.enA.toFixed(1)} (χ)`
          : `χ ${s.enA.toFixed(2)}`;
      const subB =
        s.level === 'elementary'
          ? `Pull ${s.enB.toFixed(1)} (χ)`
          : `χ ${s.enB.toFixed(2)}`;

      drawAtomCircle(ctx, ax, ay, rA, s.atomA.symbol, subA, s.atomA.color, s.hoverAtom === 'A' || s.draggingAtom === 'A');
      drawAtomCircle(ctx, bx, by, rB, s.atomB.symbol, subB, s.atomB.color, s.hoverAtom === 'B' || s.draggingAtom === 'B');

      if (s.bondFormed && metrics.partialA) {
        drawChargePill(ctx, ax, ay - rA - 22, metrics.partialA, '#BE123C');
        drawChargePill(ctx, bx, by - rB - 22, metrics.partialB, '#1D4ED8');
      }
    }

    function simBondOrder(s) {
      const need = (v) => (v <= 2 ? 2 - v : 8 - v);
      return Math.max(1, Math.min(3, Math.min(need(s.atomA.valence), need(s.atomB.valence))));
    }

    function drawValenceElectrons(ctx, ax, ay, rA, bx, by, rB, s, metrics) {
      const t = s.time;
      const orbitA = rA + 18;
      const orbitB = rB + 18;

      if (s.bondType === 'ionic') {
        const targetIsB = s.enB >= s.enA;
        const p = s.transferProgress;

        const donorX = targetIsB ? ax : bx;
        const donorY = targetIsB ? ay : by;
        const recvX = targetIsB ? bx : ax;
        const recvY = targetIsB ? by : ay;
        const donorOrbit = targetIsB ? orbitA : orbitB;
        const recvOrbit = targetIsB ? orbitB : orbitA;

        const startEx = donorX + Math.cos(t * 2.2) * donorOrbit;
        const startEy = donorY + Math.sin(t * 2.2) * donorOrbit;
        const endAngle = t * 2.5;
        const endEx = recvX + Math.cos(endAngle) * recvOrbit;
        const endEy = recvY + Math.sin(endAngle) * recvOrbit;

        const curEx = startEx + (endEx - startEx) * p;
        const arcLift = Math.sin(p * Math.PI) * -42;
        const curEy = startEy + (endEy - startEy) * p + arcLift;

        if (s.isPlaying) {
          pushTrailPoint(s.trails.shared[0], curEx, curEy, 12);
        }
        drawElectronWithTrail(ctx, curEx, curEy, s.trails.shared[0], '#BE123C', 5.4);
        const nTr = Math.min((targetIsB ? s.atomA : s.atomB).valence, 8 - (targetIsB ? s.atomB : s.atomA).valence);
        if (nTr >= 2) drawElectronDot(ctx, curEx + 10, curEy + 8, '#BE123C', 5.4);

        const nT = Math.min((targetIsB ? s.atomA : s.atomB).valence, 8 - (targetIsB ? s.atomB : s.atomA).valence);
        const countA = targetIsB ? Math.max(0, s.atomA.valence - nT) : Math.min(7, s.atomA.valence);
        const countB = targetIsB ? Math.min(7, s.atomB.valence) : Math.max(0, s.atomB.valence - nT);

        for (let i = 0; i < countA; i++) {
          const ang = t * 1.9 + (i * Math.PI * 2) / Math.max(1, countA);
          const ex = ax + Math.cos(ang) * orbitA;
          const ey = ay + Math.sin(ang) * orbitA;
          if (s.isPlaying) pushTrailPoint(s.trails.orbitA[i], ex, ey, 7);
          drawElectronWithTrail(ctx, ex, ey, s.trails.orbitA[i], '#334155', 4.3);
        }
        for (let i = 0; i < countB; i++) {
          const ang = -t * 1.9 + (i * Math.PI * 2) / Math.max(1, countB);
          const ex = bx + Math.cos(ang) * orbitB;
          const ey = by + Math.sin(ang) * orbitB;
          if (s.isPlaying) pushTrailPoint(s.trails.orbitB[i], ex, ey, 7);
          drawElectronWithTrail(ctx, ex, ey, s.trails.orbitB[i], '#334155', 4.3);
        }
      } else {
        const cx = (ax + bx) * 0.5;
        const cy = (ay + by) * 0.5;
        const halfDist = Math.abs(bx - ax) * 0.5;
        const skewShift =
          s.bondType === 'polar' && s.bondFormed
            ? halfDist * 0.44 * metrics.asymmetry
            : 0;

        if (s.bondFormed) {
          const loopW = halfDist + 16;
          const loopH = 22;
          const sharedCount = simBondOrder(s) * 2;
          const color = s.bondType === 'polar' ? '#1D4ED8' : '#0F766E';

          for (let i = 0; i < sharedCount; i++) {
            const phase = t * 3.1 + (i * Math.PI * 2) / sharedCount;
            const ex = cx + skewShift + Math.sin(phase) * (loopW * 0.72);
            const ey = cy + Math.sin(phase * 2) * (loopH * 0.72);
            if (s.isPlaying) pushTrailPoint(s.trails.shared[i], ex, ey, 11);
            drawElectronWithTrail(ctx, ex, ey, s.trails.shared[i], color, 4.9);
          }
        } else {
          const exA = ax + Math.cos(t * 2.2) * orbitA;
          const eyA = ay + Math.sin(t * 2.2) * orbitA;
          const exB = bx + Math.cos(-t * 2.2) * orbitB;
          const eyB = by + Math.sin(-t * 2.2) * orbitB;
          if (s.isPlaying) {
            pushTrailPoint(s.trails.shared[0], exA, eyA, 8);
            pushTrailPoint(s.trails.shared[1], exB, eyB, 8);
          }
          drawElectronWithTrail(ctx, exA, eyA, s.trails.shared[0], '#0F766E', 4.7);
          drawElectronWithTrail(ctx, exB, eyB, s.trails.shared[1], '#0F766E', 4.7);
        }

        const remA = Math.min(7, Math.max(0, s.atomA.valence - (s.bondFormed ? simBondOrder(s) : 1)));
        const remB = Math.min(7, Math.max(0, s.atomB.valence - (s.bondFormed ? simBondOrder(s) : 1)));
        for (let i = 0; i < remA; i++) {
          const ang = t * 1.7 + (i * Math.PI * 2) / Math.max(1, remA);
          const ex = ax + Math.cos(ang) * orbitA;
          const ey = ay + Math.sin(ang) * orbitA;
          if (s.isPlaying) pushTrailPoint(s.trails.orbitA[i], ex, ey, 7);
          drawElectronWithTrail(ctx, ex, ey, s.trails.orbitA[i], '#475569', 4.1);
        }
        for (let i = 0; i < remB; i++) {
          const ang = -t * 1.7 + (i * Math.PI * 2) / Math.max(1, remB);
          const ex = bx + Math.cos(ang) * orbitB;
          const ey = by + Math.sin(ang) * orbitB;
          if (s.isPlaying) pushTrailPoint(s.trails.orbitB[i], ex, ey, 7);
          drawElectronWithTrail(ctx, ex, ey, s.trails.orbitB[i], '#475569', 4.1);
        }
      }
    }

    function drawMetallicScene(ctx, w, h, s) {
      const cols = w < 440 ? 3 : 4;
      const rows = 2;
      const gridW = Math.min(w * 0.72, 340);
      const gridH = Math.min(h * 0.42, 145);
      const startX = (w - gridW) * 0.5;
      const startY = (h - gridH) * 0.5 + 8;
      const stepX = cols > 1 ? gridW / (cols - 1) : 0;
      const stepY = rows > 1 ? gridH / (rows - 1) : 0;

      const seaPad = 42;
      ctx.save();
      ctx.fillStyle = s.bondFormed ? 'rgba(217, 119, 6, 0.13)' : 'rgba(217, 119, 6, 0.05)';
      ctx.strokeStyle = s.bondFormed ? 'rgba(217, 119, 6, 0.36)' : 'rgba(217, 119, 6, 0.18)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.roundRect(
        startX - seaPad,
        startY - seaPad,
        gridW + seaPad * 2,
        gridH + seaPad * 2,
        28
      );
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      const coreR = Math.min(24, Math.max(19, w * 0.045));
      const hitR = Math.min(gridW, gridH) * 0.5 + seaPad * 0.5;
      s.atomPosA = { x: w * 0.5, y: startY + gridH * 0.5, r: hitR };
      s.atomPosB = { x: w * 0.5, y: startY + gridH * 0.5, r: hitR };
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jitterX = s.bondFormed ? Math.sin(s.time * 2.3 + r + c) * 2.2 : 0;
          const jitterY = s.bondFormed ? Math.cos(s.time * 2.0 + r * 2 + c) * 2.2 : 0;
          const cx = startX + c * stepX + jitterX;
          const cy = startY + r * stepY + jitterY;
          drawAtomCircle(ctx, cx, cy, coreR, s.atomA.symbol, '+', '#B45309', false);
        }
      }

      const boxX = startX - seaPad + 12;
      const boxY = startY - seaPad + 12;
      const boxW = gridW + seaPad * 2 - 24;
      const boxH = gridH + seaPad * 2 - 24;

      s.seaElectrons.forEach((el, idx) => {
        if (s.isPlaying && s.bondFormed) {
          el.u = (el.u + el.speedX * 0.014) % 1;
        }
        const ex = boxX + el.u * boxW;
        const ey =
          boxY +
          el.v * boxH +
          Math.sin(s.time * 3.2 + el.phase) * (s.bondFormed ? 9 : 2);
        if (s.isPlaying) {
          pushTrailPoint(s.trails.sea[idx], ex, ey, 8);
        }
        drawElectronWithTrail(ctx, ex, ey, s.trails.sea[idx], '#D97706', 4.3);
      });

      ctx.save();
      ctx.font = '600 11px Inter, sans-serif';
      ctx.fillStyle = '#92400E';
      ctx.textAlign = 'center';
      const metalCaption =
        s.level === 'elementary'
          ? 'Outer electrons roam freely around positive metal cores'
          : s.level === 'ug'
          ? 'Outer electrons roam freely around metal cores'
          : 'Delocalized "sea" of valence electrons across metal cations';
      ctx.fillText(
        metalCaption,
        w * 0.5,
        startY + gridH + seaPad + 20
      );
      ctx.restore();
    }

    function drawAtomCircle(ctx, x, y, r, symbol, subLabel, color, isHighlighted = false) {
      ctx.save();
      if (isHighlighted) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = 0.45;
        ctx.beginPath();
        ctx.arc(x, y, r + 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      ctx.shadowColor = 'rgba(15, 23, 42, 0.14)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 3;

      const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.15, x, y, r);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.28, color);
      grad.addColorStop(1, '#111827');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `700 ${Math.round(r * 0.54)}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(symbol, x, subLabel ? y - 3 : y);

      if (subLabel) {
        ctx.font = `500 ${Math.max(9, Math.round(r * 0.30))}px JetBrains Mono, monospace`;
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillText(subLabel, x, y + r * 0.44);
      }
      ctx.restore();
    }

    function drawElectronDot(ctx, x, y, color, radius = 4.6) {
      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();
    }

    function drawChargePill(ctx, x, y, text, color) {
      ctx.save();
      ctx.font = '700 12px JetBrains Mono, monospace';
      const w = ctx.measureText(text).width + 14;
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(x - w * 0.5, y - 11, w, 22, 999);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x, y + 0.5);
      ctx.restore();
    }

    function drawDipoleArrow(ctx, x1, y1, x2, y2, color, label) {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      const angle = Math.atan2(y2 - y1, x2 - x1);
      const headLen = 8;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(
        x2 - headLen * Math.cos(angle - Math.PI / 6),
        y2 - headLen * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        x2 - headLen * Math.cos(angle + Math.PI / 6),
        y2 - headLen * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();

      const tailX = x1 + Math.cos(angle) * 6;
      const tailY = y1 + Math.sin(angle) * 6;
      const perp = angle + Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(tailX - Math.cos(perp) * 5, tailY - Math.sin(perp) * 5);
      ctx.lineTo(tailX + Math.cos(perp) * 5, tailY + Math.sin(perp) * 5);
      ctx.stroke();

      if (label) {
        ctx.font = '600 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, (x1 + x2) * 0.5, Math.max(y1, y2) + 15);
      }
      ctx.restore();
    }

    const EN_MIN = 0.7;
    const EN_MAX = 4.0;
    const EN_STEP = 0.05;

    function buildSpectrumGradient(val) {
      const pct = Math.max(0, Math.min(100, ((val - EN_MIN) / (EN_MAX - EN_MIN)) * 100));
      return `linear-gradient(90deg, #0F766E 0%, #1D4ED8 ${pct}%, #E5E7EB ${pct}%, #E5E7EB 100%)`;
    }

    // -------------------------------------------------------------------------
    // 6. MAIN APPLICATION COMPONENT
    // -------------------------------------------------------------------------

    function App() {
      const [level, setLevel] = useState('middle');
      const [bondType, setBondType] = useState('polar');
      const [activePresetId, setActivePresetId] = useState('h2o');
      const [atomA, setAtomA] = useState(PRESETS[1].atomA);
      const [atomB, setAtomB] = useState(PRESETS[1].atomB);
      const [enA, setEnA] = useState(2.20);
      const [enB, setEnB] = useState(3.44);
      const [electronView, setElectronView] = useState('shells');
      const [isPlaying, setIsPlaying] = useState(true);
      const [bondFormed, setBondFormed] = useState(true);
      const [bondPulseCounter, setBondPulseCounter] = useState(0);

      const [quizAnswers, setQuizAnswers] = useState({});
      const [quizSubmitted, setQuizSubmitted] = useState(false);
      const [quizSeed, setQuizSeed] = useState(1);
      const [interacted, setInteracted] = useState(false);
      const [openInfo, setOpenInfo] = useState({
        pull: false,
        valence: false,
        dipole: false,
        reality: false,
      });

      const toggleInfo = (key) => {
        setOpenInfo((prev) => ({ ...prev, [key]: !prev[key] }));
      };

      const activeBondMeta = BOND_TYPES[bondType];
      const activePreset = useMemo(
        () => PRESETS.find((p) => p.id === activePresetId) || PRESETS[1],
        [activePresetId]
      );

      const metrics = useMemo(
        () => computeBondMetrics(bondType, enA, enB),
        [bondType, enA, enB]
      );

      const paulingIonicPct = useMemo(() => {
        if (bondType === 'metallic') return 0;
        const pct = (1 - Math.exp(-0.25 * metrics.deltaEn * metrics.deltaEn)) * 100;
        return Math.min(99, Math.max(0, Math.round(pct)));
      }, [bondType, metrics.deltaEn]);

      const completedChallenges = useMemo(() => {
        const stateSnapshot = { bondType, enA, enB, bondFormed };
        return CHALLENGES.map((ch) => interacted && ch.check(stateSnapshot));
      }, [bondType, enA, enB, bondFormed, interacted]);

      const selectBondTab = (nextType) => {
        setInteracted(true);
        setBondType(nextType);
        if (nextType === 'ionic') {
          setActivePresetId('nacl');
          setAtomA({ symbol: 'Na', name: 'Sodium', en: 0.93, valence: 1, color: '#E11D48' });
          setAtomB({ symbol: 'Cl', name: 'Chlorine', en: 3.16, valence: 7, color: '#0D9488' });
          setEnA(0.93);
          setEnB(3.16);
        } else if (nextType === 'covalent') {
          setActivePresetId('o2');
          setAtomA({ symbol: 'O', name: 'Oxygen A', en: 3.44, valence: 6, color: '#0F766E' });
          setAtomB({ symbol: 'O', name: 'Oxygen B', en: 3.44, valence: 6, color: '#0D9488' });
          setEnA(3.44);
          setEnB(3.44);
        } else if (nextType === 'polar') {
          setActivePresetId('h2o');
          setAtomA({ symbol: 'H', name: 'Hydrogen (×2)', en: 2.20, valence: 1, color: '#6366F1' });
          setAtomB({ symbol: 'O', name: 'Oxygen', en: 3.44, valence: 6, color: '#2563EB' });
          setEnA(2.20);
          setEnB(3.44);
        } else if (nextType === 'metallic') {
          setActivePresetId('cu');
          setAtomA({ symbol: 'Cu', name: 'Copper Core', en: 1.90, valence: 1, color: '#D97706' });
          setAtomB({ symbol: 'Cu', name: 'Copper Neighbor', en: 1.90, valence: 1, color: '#B45309' });
          setEnA(1.90);
          setEnB(1.90);
        }
        setBondFormed(true);
        setBondPulseCounter((c) => c + 1);
      };

      const applyPreset = (preset) => {
        setInteracted(true);
        setActivePresetId(preset.id);
        setBondType(preset.bondType);
        setAtomA(preset.atomA);
        setAtomB(preset.atomB);
        setEnA(preset.atomA.en);
        setEnB(preset.atomB.en);
        setBondFormed(true);
        setBondPulseCounter((c) => c + 1);
      };

      const handleEnChange = (which, rawVal) => {
        setInteracted(true);
        const val = parseFloat(rawVal);
        // Preserve 'h2o' preset identity when adjusting pull sliders on water so both H atoms stay visible
        setActivePresetId((prev) => (prev === 'h2o' ? 'h2o' : 'custom'));
        const nextEnA = which === 'A' ? val : enA;
        const nextEnB = which === 'B' ? val : enB;
        if (which === 'A') setEnA(val);
        else setEnB(val);

        if (bondType !== 'metallic') {
          const diff = Math.abs(nextEnA - nextEnB);
          if (diff >= 1.7) setBondType('ionic');
          else if (diff >= 0.5) setBondType('polar');
          else setBondType('covalent');
        }
      };

      const toggleFormBond = () => {
        setInteracted(true);
        setBondFormed((prev) => !prev);
        setBondPulseCounter((c) => c + 1);
      };

      const resetSimulation = () => {
        const p = PRESETS.find((item) => item.id === activePresetId) || PRESETS[1];
        setBondType(p.bondType);
        setAtomA(p.atomA);
        setAtomB(p.atomB);
        setEnA(p.atomA.en);
        setEnB(p.atomB.en);
        setBondFormed(true);
        setIsPlaying(true);
        setBondPulseCounter((c) => c + 1);
      };

      const handleLevelSwitch = (newLevel) => {
        setLevel(newLevel);
        setQuizAnswers({});
        setQuizSubmitted(false);
      };

      const activeQuiz = useMemo(() => {
        const bank = QUIZ_BANK[level] || QUIZ_BANK.high;
        let seed = quizSeed * 7919 + level.length * 131 + 17;
        const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
        return bank.map((item) => {
          const idx = item.options.map((_, i) => i);
          for (let i = idx.length - 1; i > 0; i--) {
            const j = Math.floor(rnd() * (i + 1));
            [idx[i], idx[j]] = [idx[j], idx[i]];
          }
          return { ...item, options: idx.map((i) => item.options[i]), correct: idx.indexOf(item.correct) };
        });
      }, [level, quizSeed]);
      const quizScore = activeQuiz.reduce(
        (acc, item, idx) => (quizAnswers[idx] === item.correct ? acc + 1 : acc),
        0
      );

      return (
        <div className="min-h-screen flex flex-col">
          {/* Top Editorial Header & Level Switcher */}
          <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur border-b border-line">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-cobalt"></span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Interactive Chemistry Studio
                  </span>
                </div>
                <h1 className="font-editorial text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
                  Types of Chemical Bonds
                </h1>
              </div>

              {/* Adaptive Curriculum Depth Switcher */}
              <div
                className="inline-flex flex-wrap p-1 rounded-xl bg-stone-200/80 border border-line self-start md:self-auto"
                role="tablist"
                aria-label="Curriculum Depth Level"
              >
                {LEVELS.map((lvl) => {
                  const active = level === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => handleLevelSwitch(lvl.id)}
                      className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all min-h-[42px] flex flex-col sm:flex-row items-center gap-1 ${
                        active
                          ? 'bg-white text-ink shadow-sm font-semibold'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      <span>{lvl.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </header>

          {/* Main Workspace */}
          <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-8">
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (7 cols on lg): Bond Type Tabs, Canvas & Transport Bar */}
              <div className="lg:col-span-7 space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.values(BOND_TYPES).map((b) => {
                    const active = bondType === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => selectBondTab(b.id)}
                        className={`px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all min-h-[44px] ${
                          active
                            ? b.tabActive
                            : 'bg-white text-ink border-line hover:bg-stone-50'
                        }`}
                      >
                        {b.label}
                      </button>
                    );
                  })}
                </div>

                {/* Interactive HTML5 Canvas */}
                <BondSimulationCanvas
                  level={level}
                  bondType={bondType}
                  isWaterMolecule={
                    (activePresetId === 'h2o' ||
                      (atomA.symbol === 'H' && atomB.symbol === 'O')) &&
                    bondType !== 'ionic' &&
                    bondType !== 'metallic'
                  }
                  atomA={atomA}
                  atomB={atomB}
                  enA={enA}
                  enB={enB}
                  electronView={electronView}
                  isPlaying={isPlaying}
                  bondFormed={bondFormed}
                  bondPulseCounter={bondPulseCounter}
                  onSetBondFormed={(val) => { setInteracted(true); setBondFormed(val); }}
                  onToggleElectronView={() =>
                    setElectronView((prev) => (prev === 'shells' ? 'cloud' : 'shells'))
                  }
                />

                {/* Canvas Action & View Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-2.5 rounded-2xl border border-line shadow-sm">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlaying((p) => !p)}
                      className="px-3.5 py-2 rounded-xl border border-line bg-paper hover:bg-stone-100 text-xs sm:text-sm font-semibold text-ink min-h-[44px]"
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>

                    <button
                      type="button"
                      onClick={toggleFormBond}
                      className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors min-h-[44px]"
                      style={{ backgroundColor: activeBondMeta.accent }}
                    >
                      {bondFormed ? 'Stretch / Separate' : 'Form Bond'}
                    </button>

                    <button
                      type="button"
                      onClick={resetSimulation}
                      className="px-3 py-2 rounded-xl border border-line bg-white hover:bg-stone-50 text-xs sm:text-sm font-medium text-muted min-h-[44px]"
                    >
                      Reset
                    </button>
                  </div>

                  {/* Electron Visualization Mode Toggle */}
                  <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-line">
                    <button
                      type="button"
                      onClick={() => setElectronView('shells')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold min-h-[36px] transition-all ${
                        electronView === 'shells'
                          ? 'bg-white text-ink shadow-sm'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      Shells
                    </button>
                    <button
                      type="button"
                      onClick={() => setElectronView('cloud')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold min-h-[36px] transition-all ${
                        electronView === 'cloud'
                          ? 'bg-white text-ink shadow-sm'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      Liquid Cloud
                    </button>
                  </div>
                </div>

                {/* Compact Pull, Valence & Dipole Strip with Expandable Info Buttons */}
                <div className="bg-white rounded-2xl border border-line p-4 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Key Concepts
                    </span>
                    <span className="text-xs font-mono font-semibold text-ink">
                      Δχ = {metrics.deltaEn.toFixed(2)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div className="rounded-xl bg-paper border border-line p-2.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-ink">Pull (χ)</span>
                        <button
                          type="button"
                          onClick={() => toggleInfo('pull')}
                          aria-expanded={openInfo.pull}
                          aria-label="Toggle info about Pull and electronegativity"
                          className="w-5 h-5 rounded-full border border-line bg-white hover:bg-stone-100 text-[11px] font-mono font-bold text-ink flex items-center justify-center shrink-0"
                        >
                          i
                        </button>
                      </div>
                      {openInfo.pull && (
                        <p className="text-muted leading-relaxed mt-1.5 pt-1.5 border-t border-line/70">
                          <RichMathText
                            text={
                              level === 'elementary'
                                ? 'How strongly an atom pulls shared electrons. **Spark Starter** calls this **Pull**; upper levels use **χ** and **Δχ** for the pull gap.'
                                : 'Electronegativity (**χ**) measures attraction for shared electrons (**Pull** in **Spark Starter**). **Δχ** is the difference between two atoms.'
                            }
                          />
                        </p>
                      )}
                    </div>

                    <div className="rounded-xl bg-paper border border-line p-2.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-ink">Valence</span>
                        <button
                          type="button"
                          onClick={() => toggleInfo('valence')}
                          aria-expanded={openInfo.valence}
                          aria-label="Toggle info about valence electrons"
                          className="w-5 h-5 rounded-full border border-line bg-white hover:bg-stone-100 text-[11px] font-mono font-bold text-ink flex items-center justify-center shrink-0"
                        >
                          i
                        </button>
                      </div>
                      {openInfo.valence && (
                        <p className="text-muted leading-relaxed mt-1.5 pt-1.5 border-t border-line/70">
                          <RichMathText
                            text={
                              level === 'elementary'
                                ? 'An atom’s outer electron ring—the outer dots that share, jump, or roam during bonding.'
                                : 'Outermost shell electrons that drive sharing, electron transfer, or metallic delocalization.'
                            }
                          />
                        </p>
                      )}
                    </div>

                    <div className="rounded-xl bg-paper border border-line p-2.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-ink">Dipole</span>
                        <button
                          type="button"
                          onClick={() => toggleInfo('dipole')}
                          aria-expanded={openInfo.dipole}
                          aria-label="Toggle info about dipoles"
                          className="w-5 h-5 rounded-full border border-line bg-white hover:bg-stone-100 text-[11px] font-mono font-bold text-ink flex items-center justify-center shrink-0"
                        >
                          i
                        </button>
                      </div>
                      {openInfo.dipole && (
                        <p className="text-muted leading-relaxed mt-1.5 pt-1.5 border-t border-line/70">
                          <RichMathText
                            text={
                              level === 'elementary'
                                ? 'Uneven pull creating slight (+) and (−) ends, shown by the dipole arrow on the canvas.'
                                : 'Asymmetric charge distribution creating **δ+** and **δ−** ends (or dipole moment **μ**), shown by the arrow.'
                            }
                          />
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols on lg): Explanation Card, Species Presets & Sliders */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-2xl border border-line p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${activeBondMeta.badgeBg}`}
                    >
                      {activeBondMeta.label} Bond
                    </span>
                    <span className="text-xs font-mono text-muted">
                      {level === 'elementary'
                        ? `Pull Gap: ${metrics.deltaEn.toFixed(1)}`
                        : level === 'ug'
                        ? `Δχ = ${metrics.deltaEn.toFixed(2)} • ${paulingIonicPct}% ionic (est.)`
                        : `Δχ = ${metrics.deltaEn.toFixed(2)}`}
                    </span>
                  </div>

                  <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-ink">
                    {level === 'elementary'
                      ? `How ${activeBondMeta.label} Bonds Work`
                      : level === 'middle'
                      ? `Valence Electron Behavior: ${activeBondMeta.label}`
                      : level === 'high'
                      ? `Structure & Electronegativity: ${activeBondMeta.label}`
                      : `Deeper Look at ${activeBondMeta.label} Bonds`}
                  </h2>

                  <p className="text-sm sm:text-[15px] leading-relaxed text-ink/90">
                    <RichMathText text={activeBondMeta.summary[level]} />
                  </p>

                  <div className="rounded-xl bg-paper border border-line p-3 text-xs sm:text-sm text-muted leading-relaxed">
                    <span className="font-semibold text-ink">
                      {level === 'elementary'
                        ? 'Visual picture: '
                        : level === 'middle'
                        ? 'Key model: '
                        : level === 'high'
                        ? 'Energetic & structural note: '
                        : 'Why it matters: '}
                    </span>
                    <RichMathText text={activeBondMeta.analogy[level]} />
                  </div>
                </div>

                {/* Real-World Species Presets */}
                <div className="bg-white rounded-2xl border border-line p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Real-World Species
                    </span>
                    <span className="text-xs text-muted">Tap to load</span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {PRESETS.map((p) => {
                      const active = activePresetId === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => applyPreset(p)}
                          className={`p-2 rounded-xl border text-center transition-all min-h-[54px] flex flex-col items-center justify-center ${
                            active
                              ? 'border-ink bg-paper shadow-sm'
                              : 'border-line bg-white hover:bg-stone-50'
                          }`}
                        >
                          <span className="text-sm font-semibold text-ink">
                            <MathText tex={p.mhchem} />
                          </span>
                          <span className="text-[11px] text-muted truncate max-w-full">
                            {p.name.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {activePresetId !== 'custom' && (
                    <div className="space-y-2 pt-1">
                      <div className="text-xs text-center text-ink bg-paper rounded-lg py-2 px-3 border border-line space-y-1">
                        <div>
                          <MathText tex={activePreset.formulaNote[level]} />
                        </div>
                        {typeof activePreset.smiles === 'string' && activePreset.smiles.trim() !== '' && (level === 'high' || level === 'ug') && (
                          <div className="text-[11px] font-mono text-muted">
                            SMILES: <span className="text-ink font-semibold">{String(activePreset.smiles)}</span>
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                        <div className="bg-paper rounded-lg p-2 border border-line">
                          <div className="text-muted">
                            {level === 'elementary' ? 'Shape' : level === 'ug' ? 'Shape & Grid' : 'Geometry'}
                          </div>
                          <ChemShapeSketch presetId={activePreset.id} />
                          <div className="font-semibold text-ink mt-0.5 leading-tight">
                            <RichMathText text={activePreset.geometryLabel[level]} />
                          </div>
                        </div>
                        <div className="bg-paper rounded-lg p-2 border border-line">
                          <div className="text-muted">
                            {level === 'elementary' ? 'Electron Pair' : level === 'ug' ? 'Electrons' : 'Bond Order'}
                          </div>
                          <ChemElectronPairSketch presetId={activePreset.id} />
                          <div className="font-semibold text-ink mt-0.5 leading-tight">
                            <RichMathText text={activePreset.bondOrder[level]} />
                          </div>
                        </div>
                        <div className="bg-paper rounded-lg p-2 border border-line">
                          <div className="text-muted">
                            {level === 'elementary' ? 'Hold Strength' : level === 'ug' ? 'Bond Strength' : 'Bond Energy'}
                          </div>
                          <ChemHoldStrengthSketch presetId={activePreset.id} />
                          <div className="font-semibold text-ink mt-0.5 leading-tight">
                            <RichMathText text={activePreset.bondEnergy[level]} />
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] text-muted text-center leading-snug">Strength figures measure different things: lattice energy (ionic), bond dissociation energy (molecular), cohesive energy (metals). They are not directly comparable.</p>
                    </div>
                  )}
                </div>

                {/* Electronegativity Tug-of-War Controls */}
                <div className="bg-white rounded-2xl border border-line p-4 shadow-sm space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                        {level === 'elementary'
                          ? 'Pull & Sharing (χ)'
                          : level === 'ug'
                          ? 'Pull Gap & Ionicity'
                          : 'Electronegativity (χ) & Pull'}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleInfo('reality')}
                        aria-expanded={openInfo.reality}
                        aria-label="Toggle info about whether Pauling electronegativity changes in reality"
                        className="w-5 h-5 rounded-full border border-line bg-paper hover:bg-stone-100 text-[11px] font-mono font-bold text-ink flex items-center justify-center"
                      >
                        i
                      </button>
                    </div>
                    <span className="text-xs font-mono font-semibold text-ink">
                      {level === 'ug'
                        ? `Δχ = ${metrics.deltaEn.toFixed(2)} (${paulingIonicPct}% ionic (est.))`
                        : `Δχ = ${metrics.deltaEn.toFixed(2)}`}
                    </span>
                  </div>

                  {openInfo.reality && (
                    <p className="text-[11px] leading-snug text-muted bg-paper border border-line rounded-lg px-2.5 py-2">
                      {level === 'ug'
                        ? 'Each real element has its own standard pull (χ), while these sliders let you test what happens as the pull gap changes.'
                        : 'Each element has a fixed Pauling electronegativity (χ) in reality—these sliders let you test "what-if" scenarios across bond types.'}
                    </p>
                  )}

                  {/* Atom A Slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor="slider-en-a" className="font-semibold text-ink">
                        {(activePresetId === 'h2o' ||
                          (atomA.symbol === 'H' && atomB.symbol === 'O')) &&
                        bondType !== 'ionic' &&
                        bondType !== 'metallic'
                          ? 'Hydrogen Atoms (×2) — Pull (χ)'
                          : `${atomA.name} (${atomA.symbol}) — ${level === 'elementary' ? 'Pull (χ)' : 'χ_A'}`}
                      </label>
                      <span className="font-mono font-semibold text-ink">
                        {enA.toFixed(2)}
                      </span>
                    </div>
                    <input
                      id="slider-en-a"
                      type="range"
                      min={EN_MIN}
                      max={EN_MAX}
                      step={EN_STEP}
                      value={enA}
                      onChange={(e) => handleEnChange('A', e.target.value)}
                      className="chem-slider"
                      style={{ background: buildSpectrumGradient(enA) }}
                    />
                  </div>

                  {/* Atom B Slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor="slider-en-b" className="font-semibold text-ink">
                        {(activePresetId === 'h2o' ||
                          (atomA.symbol === 'H' && atomB.symbol === 'O')) &&
                        bondType !== 'ionic' &&
                        bondType !== 'metallic'
                          ? 'Central Oxygen (O) — Pull (χ)'
                          : `${atomB.name} (${atomB.symbol}) — ${level === 'elementary' ? 'Pull (χ)' : 'χ_B'}`}
                      </label>
                      <span className="font-mono font-semibold text-ink">
                        {enB.toFixed(2)}
                      </span>
                    </div>
                    <input
                      id="slider-en-b"
                      type="range"
                      min={EN_MIN}
                      max={EN_MAX}
                      step={EN_STEP}
                      value={enB}
                      onChange={(e) => handleEnChange('B', e.target.value)}
                      className="chem-slider"
                      style={{ background: buildSpectrumGradient(enB) }}
                    />
                  </div>

                  {/* Spectrum Guide Labels */}
                  <div className="flex items-center justify-between text-[11px] text-muted pt-0.5">
                    <span>
                      {level === 'elementary' ? 'Even share' : 'Nonpolar (< 0.5)'}
                    </span>
                    <span>
                      {level === 'elementary' ? 'Unequal pull' : 'Polar (0.5–1.7)'}
                    </span>
                    <span>
                      {level === 'elementary' ? 'Electron jump' : 'Ionic (≳ 1.7, rule of thumb)'}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Macroscopic Properties Comparison Strip */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl bg-white border border-line p-4 shadow-sm space-y-1.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {level === 'elementary' ? 'Structure & Shape' : 'State & Mechanical Behavior'}
                </div>
                <p className="text-xs sm:text-sm text-ink leading-relaxed">
                  <RichMathText text={activeBondMeta.properties.state[level]} />
                </p>
              </div>

              <div className="rounded-xl bg-white border border-line p-4 shadow-sm space-y-1.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {level === 'elementary' ? 'Carrying Electricity' : 'Electrical Conductivity'}
                </div>
                <p className="text-xs sm:text-sm text-ink leading-relaxed">
                  <RichMathText text={activeBondMeta.properties.conductivity[level]} />
                </p>
              </div>

              <div className="rounded-xl bg-white border border-line p-4 shadow-sm space-y-1.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {level === 'elementary' ? 'Mixing with Water' : 'Solubility & Solvent Behavior'}
                </div>
                <p className="text-xs sm:text-sm text-ink leading-relaxed">
                  <RichMathText text={activeBondMeta.properties.solubility[level]} />
                </p>
              </div>
            </section>

            {/* Guided Exploration Challenges */}
            <section className="bg-white rounded-2xl border border-line p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Guided Exploration
                  </span>
                  <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-ink">
                    {level === 'elementary'
                      ? 'Bond Builder Missions'
                      : level === 'ug'
                      ? 'Quantum Lab Mini-Challenges'
                      : 'Interactive Lab Challenges'}
                  </h2>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-paper border border-line text-ink self-start sm:self-auto">
                  {completedChallenges.filter(Boolean).length} / {CHALLENGES.length} Completed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {CHALLENGES.map((ch, idx) => {
                  const done = completedChallenges[idx];
                  return (
                    <div
                      key={ch.id}
                      className={`rounded-xl border p-4 transition-all flex items-start gap-3 ${
                        done
                          ? 'bg-emerald-50/70 border-emerald-300'
                          : 'bg-paper/60 border-line'
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          done
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white border border-line text-muted'
                        }`}
                      >
                        {done ? '✓' : idx + 1}
                      </div>
                      <div className="space-y-1 text-xs sm:text-sm">
                        <div className="font-semibold text-ink">{ch.title[level]}</div>
                        <p className="text-muted leading-relaxed">
                          <RichMathText text={ch.prompt[level]} />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Level-Adaptive Quick Check Quiz */}
            <section className="bg-white rounded-2xl border border-line p-5 sm:p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                    Check Your Understanding ({LEVELS.find((l) => l.id === level)?.label} Level)
                  </span>
                  <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-ink">
                    Quick Concept Check
                  </h2>
                </div>

                {quizSubmitted && (
                  <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 self-start sm:self-auto">
                    Score: {quizScore} / {activeQuiz.length}
                  </span>
                )}
              </div>

              <div className="space-y-5">
                {activeQuiz.map((item, qIdx) => {
                  const chosen = quizAnswers[qIdx];
                  return (
                    <div
                      key={qIdx}
                      className="rounded-xl border border-line bg-paper/50 p-4 space-y-3"
                    >
                      <div className="text-sm sm:text-[15px] font-semibold text-ink leading-snug">
                        <span className="mr-1.5 text-muted">{qIdx + 1}.</span>
                        <RichMathText text={item.q} />
                      </div>

                      <div className="space-y-2">
                        {item.options.map((opt, oIdx) => {
                          const isSelected = chosen === oIdx;
                          const isRight = item.correct === oIdx;

                          let btnStyle =
                            'bg-white border-line text-ink hover:bg-stone-50';
                          if (quizSubmitted) {
                            if (isRight) {
                              btnStyle =
                                'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium';
                            } else if (isSelected && !isRight) {
                              btnStyle =
                                'bg-rose-50 border-rose-300 text-rose-950';
                            }
                          } else if (isSelected) {
                            btnStyle =
                              'bg-blue-50/80 border-blue-500 text-blue-950 font-medium';
                          }

                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => {
                                if (!quizSubmitted) {
                                  setQuizAnswers((prev) => ({
                                    ...prev,
                                    [qIdx]: oIdx,
                                  }));
                                }
                              }}
                              className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all min-h-[44px] flex items-center gap-2.5 ${btnStyle}`}
                            >
                              <span className="w-5 h-5 rounded-full border border-current/30 flex items-center justify-center text-[11px] font-mono shrink-0">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span>
                                <RichMathText text={opt} />
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="text-xs sm:text-sm text-muted bg-white border border-line rounded-lg p-3 leading-relaxed">
                          <span className="font-semibold text-ink">Explanation: </span>
                          <RichMathText text={item.explain} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  disabled={Object.keys(quizAnswers).length < activeQuiz.length}
                  onClick={() => setQuizSubmitted(true)}
                  className="px-5 py-2.5 rounded-xl bg-ink text-white text-xs sm:text-sm font-semibold disabled:opacity-40 hover:bg-ink/90 transition-all min-h-[44px]"
                >
                  Check Answers
                </button>

                {quizSubmitted && (
                  <button
                    type="button"
                    onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); setQuizSeed((n) => n + 1); }}
                    className="px-4 py-2.5 rounded-xl border border-line bg-white text-xs sm:text-sm font-medium text-muted hover:text-ink min-h-[44px]"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </section>
          {level === 'ug' && <QuantumExtras enA={enA} enB={enB} />}
          </main>

          {/* Minimal Footer */}
          <footer className="border-t border-line bg-white/70 py-4 px-4 sm:px-6 text-center text-xs text-muted">
            KaTeX + mhchem chemical notation &amp; SMILES descriptors • Interactive simulation across Ionic, Covalent, Polar Covalent &amp; Metallic bonding
          </footer>
        </div>
      );
    }

        // -------------------------------------------------------------------------
    // QUANTUM LAB EXTRAS: MO diagrams, van Arkel–Ketelaar triangle, band theory
    // -------------------------------------------------------------------------

    const MO_DATA = {
      o2: {
        name: 'O₂', electrons: 12,
        levels: [
          { l: 'σ2s', n: 1, b: true }, { l: 'σ*2s', n: 1, b: false },
          { l: 'σ2p', n: 1, b: true }, { l: 'π2p', n: 2, b: true },
          { l: 'π*2p', n: 2, b: false }, { l: 'σ*2p', n: 1, b: false },
        ],
        note: 'The two electrons in π* occupy separate orbitals with parallel spins (Hund’s rule). That is why liquid O₂ is attracted to a magnet, which a Lewis structure cannot explain.',
      },
      n2: {
        name: 'N₂', electrons: 10,
        levels: [
          { l: 'σ2s', n: 1, b: true }, { l: 'σ*2s', n: 1, b: false },
          { l: 'π2p', n: 2, b: true }, { l: 'σ2p', n: 1, b: true },
          { l: 'π*2p', n: 2, b: false }, { l: 'σ*2p', n: 1, b: false },
        ],
        note: 'For N₂ and lighter diatomics, s–p mixing pushes σ2p above π2p. All bonding orbitals are full and all antibonding ones empty, giving a very strong triple bond (945 kJ/mol).',
      },
    };

    function fillMO(key) {
      const d = MO_DATA[key];
      let left = d.electrons;
      let bonding = 0, anti = 0, unpaired = 0;
      const rows = d.levels.map((lv) => {
        const up = Math.min(lv.n, left); left -= up;
        const down = Math.min(lv.n, left); left -= down;
        if (lv.b) bonding += up + down; else anti += up + down;
        unpaired += up - down;
        return { ...lv, up, down };
      });
      return { rows, order: (bonding - anti) / 2, unpaired, d };
    }

    function MODiagram() {
      const [mol, setMol] = useState('o2');
      const { rows, order, unpaired, d } = useMemo(() => fillMO(mol), [mol]);
      return (
        <div className="space-y-3">
          <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-line">
            {Object.entries(MO_DATA).map(([k, v]) => (
              <button key={k} type="button" onClick={() => setMol(k)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold min-h-[36px] ${mol === k ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink'}`}>
                {v.name}
              </button>
            ))}
          </div>
          <svg viewBox="0 0 360 270" className="w-full max-w-md mx-auto" role="img" aria-label={`Molecular orbital diagram for ${d.name}`}>
            <text x="10" y="16" fontSize="10" fill="#525B6E" fontFamily="Inter, sans-serif">Energy ↑</text>
            {rows.map((r, i) => {
              const y = 245 - i * 40;
              const color = r.b ? '#0F766E' : '#BE123C';
              return (
                <g key={r.l}>
                  {Array.from({ length: r.n }).map((_, j) => {
                    const x = r.n === 1 ? 158 : 128 + j * 60;
                    return (
                      <g key={j}>
                        <line x1={x} y1={y} x2={x + 44} y2={y} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
                        <text x={x + 22} y={y - 6} textAnchor="middle" fontSize="15" fontWeight="700" fill="#161A22" fontFamily="Inter, sans-serif">
                          {j < r.up ? '↑' : ''}{j < r.down ? '↓' : ''}
                        </text>
                      </g>
                    );
                  })}
                  <text x="20" y={y + 4} fontSize="12" fontWeight="600" fill={color} fontFamily="Inter, sans-serif">{r.l}</text>
                  <text x="330" y={y + 4} textAnchor="end" fontSize="10" fill="#525B6E" fontFamily="Inter, sans-serif">{r.b ? 'bonding' : 'antibonding'}</text>
                </g>
              );
            })}
          </svg>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-paper border border-line p-2.5">
              <div className="text-muted">Bond order</div>
              <div className="font-semibold text-ink">(bonding − antibonding) / 2 = {order}</div>
            </div>
            <div className="rounded-lg bg-paper border border-line p-2.5">
              <div className="text-muted">Unpaired electrons</div>
              <div className="font-semibold text-ink">{unpaired} {unpaired > 0 ? '(paramagnetic)' : '(diamagnetic)'}</div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">{d.note} Valence orbitals only; the 1s core orbitals are omitted.</p>
        </div>
      );
    }

    const TRI_POINTS = [
      { n: 'NaCl', a: 0.93, b: 3.16 }, { n: 'MgO', a: 1.31, b: 3.44 },
      { n: 'AlCl₃', a: 1.61, b: 3.16 }, { n: 'HF', a: 2.20, b: 3.98 },
      { n: 'H₂O (O–H)', a: 2.20, b: 3.44 }, { n: 'Cu', a: 1.90, b: 1.90 },
      { n: 'O₂', a: 3.44, b: 3.44 },
    ];

    function KetelaarTriangle({ enA, enB }) {
      const px = (avg) => 42 + ((avg - 0.7) / 3.3) * 296;
      const py = (dx) => 236 - (dx / 3.4) * 210;
      const pts = [...TRI_POINTS.map((p) => ({ ...p, avg: (p.a + p.b) / 2, dx: Math.abs(p.a - p.b) })),
        { n: 'Your sliders', avg: (enA + enB) / 2, dx: Math.abs(enA - enB), live: true }];
      return (
        <svg viewBox="0 0 360 270" className="w-full max-w-md mx-auto" role="img" aria-label="Van Arkel–Ketelaar triangle">
          <rect x="42" y="26" width="296" height="210" fill="#FAF8F5" stroke="#E4E0D8" />
          <line x1="42" y1={py(1.7)} x2="338" y2={py(1.7)} stroke="#BE123C" strokeDasharray="4 3" opacity="0.5" />
          <line x1="42" y1={py(0.5)} x2="338" y2={py(0.5)} stroke="#1D4ED8" strokeDasharray="4 3" opacity="0.5" />
          <text x="46" y={py(2.9)} fontSize="10" fill="#BE123C" fontFamily="Inter, sans-serif">IONIC</text>
          <text x="46" y={py(1.1)} fontSize="10" fill="#1D4ED8" fontFamily="Inter, sans-serif">POLAR COVALENT</text>
          <text x="46" y={py(0.2)} fontSize="10" fill="#B45309" fontFamily="Inter, sans-serif">METALLIC</text>
          <text x="334" y={py(0.2)} textAnchor="end" fontSize="10" fill="#0F766E" fontFamily="Inter, sans-serif">COVALENT</text>
          {pts.map((p) => (
            <g key={p.n}>
              <circle cx={px(p.avg)} cy={py(p.dx)} r={p.live ? 7 : 4.5} fill={p.live ? '#161A22' : '#1D4ED8'} stroke="#fff" strokeWidth="1.5" />
              <text x={px(p.avg) + 8} y={py(p.dx) - 6} fontSize="10" fontWeight={p.live ? 700 : 500} fill="#161A22" fontFamily="Inter, sans-serif">{p.n}</text>
            </g>
          ))}
          <text x="190" y="262" textAnchor="middle" fontSize="10" fill="#525B6E" fontFamily="Inter, sans-serif">Average χ →</text>
          <text x="12" y="132" fontSize="10" fill="#525B6E" fontFamily="Inter, sans-serif" transform="rotate(-90 12 132)" textAnchor="middle">Δχ →</text>
        </svg>
      );
    }

    function BandSketch({ title, gap, caption }) {
      return (
        <div className="rounded-xl bg-paper border border-line p-3 text-center space-y-1">
          <svg viewBox="0 0 90 90" className="w-20 h-20 mx-auto" role="img" aria-label={title}>
            {gap === 0 ? (
              <rect x="14" y="14" width="62" height="62" rx="4" fill="#FDE68A" stroke="#B45309" />
            ) : (
              <>
                <rect x="14" y="10" width="62" height="24" rx="4" fill="#E2E8F0" stroke="#64748B" />
                <rect x="14" y={34 + gap} width="62" height="24" rx="4" fill="#BFDBFE" stroke="#1D4ED8" />
              </>
            )}
          </svg>
          <div className="text-xs font-semibold text-ink">{title}</div>
          <div className="text-[11px] text-muted leading-snug">{caption}</div>
        </div>
      );
    }

    function QuantumExtras({ enA, enB }) {
      const card = 'bg-white rounded-2xl border border-line p-5 sm:p-6 shadow-sm space-y-3';
      const kicker = 'text-xs font-semibold uppercase tracking-wider text-muted';
      return (
        <section className="space-y-6">
          <div className={card}>
            <span className={kicker}>Quantum Lab • Molecular Orbital Theory</span>
            <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-ink">Why O₂ is magnetic and N₂ is so strong</h2>
            <MODiagram />
          </div>

          <div className={card}>
            <span className={kicker}>Quantum Lab • Bond Character as a Continuum</span>
            <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-ink">Van Arkel–Ketelaar triangle</h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Plotting average χ against Δχ shows ionic, covalent and metallic bonding as regions of one map. Real compounds sit between the corners (AlCl₃ is partly ionic; HF is polar covalent even though Δχ is 1.78). Your slider values appear as the dark point. The dashed lines mark the 0.5 and 1.7 rules of thumb.
            </p>
            <KetelaarTriangle enA={enA} enB={enB} />
          </div>

          <div className={card}>
            <span className={kicker}>Quantum Lab • Band Theory</span>
            <h2 className="font-editorial text-xl sm:text-2xl font-semibold text-ink">Beyond the “sea of electrons”</h2>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              In a solid, atomic orbitals merge into bands. A metal has a partly filled band (or overlapping bands), so electrons can gain tiny amounts of energy and move. Hotter metals conduct slightly worse, because lattice vibrations scatter the electrons. Semiconductors have a small gap, so heating promotes electrons across it and conductivity rises.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <BandSketch title="Metal (Cu)" gap={0} caption="No gap. Conductivity falls as temperature rises." />
              <BandSketch title="Semiconductor (Si)" gap={6} caption="Gap ≈ 1.1 eV. Conductivity rises with temperature." />
              <BandSketch title="Insulator (diamond)" gap={22} caption="Gap ≈ 5.5 eV. Electrons essentially cannot cross." />
            </div>
          </div>

          <div className="rounded-xl bg-white border border-line p-4 shadow-sm text-xs sm:text-sm text-muted leading-relaxed">
            <span className="font-semibold text-ink">About χ: </span>
            Pauling electronegativity is not directly measurable. It is derived from bond energies, and other scales (Mulliken, Allen) give slightly different values. It also changes with an atom’s oxidation state and surroundings, so treat Δχ as a useful guide rather than a law.
          </div>
        </section>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <ModuleErrorBoundary>
        <App />
      </ModuleErrorBoundary>
    );
  