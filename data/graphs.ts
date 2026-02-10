import { GrafcetData } from '../types';

// --- CONSTANTS FOR LAYOUT ---
const COL_CENTER = 300;
const COL_LEFT = 150;
const COL_RIGHT = 450;
const STEP_SIZE = 40;
const Y_START = 50;
const Y_GAP = 120;

export const grafcetPrincipal: GrafcetData = {
  title: "GRAFCET PRINCIPAL",
  description: "Fraiseuse CNC S7-1500 - Cycle Principal",
  viewBox: "0 0 800 1300",
  steps: [
    { id: '0', stepNumber: '0', type: 'initial', x: COL_CENTER, y: Y_START, actions: [{ type: '', content: ["Arrêt / Attente", "Mode_Manuel = FALSE", "Tous_Axes_PowerOff"] }] },
    { id: '1', stepNumber: '1', type: 'regular', x: COL_CENTER, y: Y_START + Y_GAP, actions: [{ type: '', content: ["Initialisation (Homing)", "Appel SG_Homing", "Timeout = 30s"] }] },
    { id: '2', stepNumber: '2', type: 'regular', x: COL_CENTER, y: Y_START + Y_GAP * 2, actions: [{ type: '', content: ["Activation asservissements", "MC_Power(Tous, Enable:=TRUE)"] }] },
    { id: '3', stepNumber: '3', type: 'regular', x: COL_CENTER, y: Y_START + Y_GAP * 3, actions: [{ type: '', content: ["Positionnement initial", "MC_MoveAbs(X_Init, Y_Init, Z_Secu)"] }] },
    { id: '4', stepNumber: '4', type: 'regular', x: COL_CENTER, y: Y_START + Y_GAP * 4, actions: [{ type: '', content: ["Lancement broche", "MC_MoveVelocity(8000.0)", "Direction := 1 (Horaire)"] }] },
    { id: '5', stepNumber: '5', type: 'regular', x: COL_CENTER, y: Y_START + Y_GAP * 5, actions: [{ type: '', content: ["Usinage contour", "Appel SG_Usinage_Contour"] }] },
    { id: '6', stepNumber: '6', type: 'regular', x: COL_CENTER, y: Y_START + Y_GAP * 6, actions: [{ type: '', content: ["Dégagement outil", "MC_MoveAbs(Z_Securite)", "MC_GearOut(Broche)"] }] },
    { id: '7', stepNumber: '7', type: 'regular', x: COL_CENTER, y: Y_START + Y_GAP * 7, actions: [{ type: '', content: ["Arrêt broche", "MC_Halt(Decel:=2000)"] }] },
    { id: '8', stepNumber: '8', type: 'regular', x: COL_CENTER, y: Y_START + Y_GAP * 8, actions: [{ type: '', content: ["Retour position repos", "MC_MoveAbs(X=0, Y=0)"] }] },
  ],
  transitions: [
    { id: 't0', from: '0', to: '1', condition: "Départ_Cycle • Sécurités_OK • Mode_Auto", x: COL_CENTER, y: Y_START + 60 },
    { id: 't1', from: '1', to: '2', condition: "Axes_Referenced", x: COL_CENTER, y: Y_START + Y_GAP + 60 },
    { id: 't2', from: '2', to: '3', condition: "Power_On • (Tous_Axes.Status.StandStill)", x: COL_CENTER, y: Y_START + Y_GAP * 2 + 60 },
    { id: 't3', from: '3', to: '4', condition: "Position_Atteinte", x: COL_CENTER, y: Y_START + Y_GAP * 3 + 60 },
    { id: 't4', from: '4', to: '5', condition: "Broche_Vitesse_OK • (Velocity >= 7900)", x: COL_CENTER, y: Y_START + Y_GAP * 4 + 60 },
    { id: 't5', from: '5', to: '6', condition: "Trajectoire_Terminée", x: COL_CENTER, y: Y_START + Y_GAP * 5 + 60 },
    { id: 't6', from: '6', to: '7', condition: "Dégagement_OK • (AxeZ.Done)", x: COL_CENTER, y: Y_START + Y_GAP * 6 + 60 },
    { id: 't7', from: '7', to: '8', condition: "Broche_Arrêtée • (Velocity <= 50)", x: COL_CENTER, y: Y_START + Y_GAP * 7 + 60 },
    { id: 't8', from: '8', to: '0', condition: "Repos_Atteint", x: COL_CENTER, y: Y_START + Y_GAP * 8 + 60 },
  ],
  links: [
    { from: { x: COL_CENTER, y: Y_START + 20 }, to: { x: COL_CENTER, y: Y_START + 60 }, type: 'vertical' }, // 0->t0
    { from: { x: COL_CENTER, y: Y_START + 60 }, to: { x: COL_CENTER, y: Y_START + Y_GAP - 20 }, type: 'vertical' }, // t0->1
    // ... Fill standard verticals
    { from: { x: COL_CENTER, y: Y_START + Y_GAP + 20 }, to: { x: COL_CENTER, y: Y_START + Y_GAP + 60 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: Y_START + Y_GAP + 60 }, to: { x: COL_CENTER, y: Y_START + Y_GAP * 2 - 20 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: Y_START + Y_GAP * 2 + 20 }, to: { x: COL_CENTER, y: Y_START + Y_GAP * 2 + 60 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: Y_START + Y_GAP * 2 + 60 }, to: { x: COL_CENTER, y: Y_START + Y_GAP * 3 - 20 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: Y_START + Y_GAP * 3 + 20 }, to: { x: COL_CENTER, y: Y_START + Y_GAP * 3 + 60 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: Y_START + Y_GAP * 3 + 60 }, to: { x: COL_CENTER, y: Y_START + Y_GAP * 4 - 20 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: Y_START + Y_GAP * 4 + 20 }, to: { x: COL_CENTER, y: Y_START + Y_GAP * 4 + 60 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: Y_START + Y_GAP * 4 + 60 }, to: { x: COL_CENTER, y: Y_START + Y_GAP * 5 - 20 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: Y_START + Y_GAP * 5 + 20 }, to: { x: COL_CENTER, y: Y_START + Y_GAP * 5 + 60 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: Y_START + Y_GAP * 5 + 60 }, to: { x: COL_CENTER, y: Y_START + Y_GAP * 6 - 20 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: Y_START + Y_GAP * 6 + 20 }, to: { x: COL_CENTER, y: Y_START + Y_GAP * 6 + 60 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: Y_START + Y_GAP * 6 + 60 }, to: { x: COL_CENTER, y: Y_START + Y_GAP * 7 - 20 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: Y_START + Y_GAP * 7 + 20 }, to: { x: COL_CENTER, y: Y_START + Y_GAP * 7 + 60 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: Y_START + Y_GAP * 7 + 60 }, to: { x: COL_CENTER, y: Y_START + Y_GAP * 8 - 20 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: Y_START + Y_GAP * 8 + 20 }, to: { x: COL_CENTER, y: Y_START + Y_GAP * 8 + 60 }, type: 'vertical' },

    // Loopback 8 -> 0
    { from: { x: COL_CENTER, y: Y_START + Y_GAP * 8 + 60 }, to: { x: COL_CENTER - 200, y: Y_START + Y_GAP * 8 + 60 }, type: 'elbow' },
    { from: { x: COL_CENTER - 200, y: Y_START + Y_GAP * 8 + 60 }, to: { x: COL_CENTER - 200, y: Y_START - 30 }, type: 'vertical' },
    { from: { x: COL_CENTER - 200, y: Y_START - 30 }, to: { x: COL_CENTER, y: Y_START - 30 }, type: 'elbow' },
    { from: { x: COL_CENTER, y: Y_START - 30 }, to: { x: COL_CENTER, y: Y_START - 20 }, type: 'vertical' },
  ]
};

export const grafcetHoming: GrafcetData = {
  title: "SOUS-GRAFCET : HOMING",
  description: "Initialisation des Axes - Séquence Parallèle (ET)",
  viewBox: "0 0 1100 800",
  steps: [
    { id: '10', stepNumber: '10', type: 'initial', x: 400, y: 60, actions: [{ type: '', content: ["Lancement Homing", "Init_Homing := TRUE", "Status = 'En cours'"] }] },
    { id: '11', stepNumber: '11', type: 'regular', x: 100, y: 300, actions: [{ type: '', content: ["Homing Axe Z", "MC_Home(AxeZ)"] }] },
    { id: '12', stepNumber: '12', type: 'regular', x: 400, y: 300, actions: [{ type: '', content: ["Homing Axe X", "MC_Home(AxeX)"] }] },
    { id: '13', stepNumber: '13', type: 'regular', x: 700, y: 300, actions: [{ type: '', content: ["Homing Axe Y", "MC_Home(AxeY)"] }] },
    { id: '14', stepNumber: '14', type: 'regular', x: 400, y: 520, actions: [{ type: '', content: ["Vérification positions", "Status_Homing = 'Terminé'"] }] },
  ],
  transitions: [
    {
      id: 't10',
      from: '10',
      to: ['11', '12', '13'],
      condition: "Init_Homing • Sécurités_OK",
      x: 400,
      y: 160,
      type: 'divergence_and'
    },
    {
      id: 't14',
      from: ['11', '12', '13'],
      to: '14',
      condition: "AxeX.Done • AxeY.Done • AxeZ.Done • Timeout < 30s",
      x: 400,
      y: 420,
      type: 'convergence_and'
    },
    {
      id: 't_return',
      from: '14',
      to: [], // End of sub grafcet
      condition: "Axes_Referenced • Pas_Alarme",
      x: 400,
      y: 640
    }
  ],
  links: [
    // Step 10 → Transition t10 (simple bar at y=160)
    { from: { x: 400, y: 80 }, to: { x: 400, y: 179.5 }, type: 'vertical' },

    // Divergence AND — branches from AND bars (at y=185) to steps 11, 12, 13
    { from: { x: 400, y: 190 }, to: { x: 400, y: 280 }, type: 'vertical' },     // Center branch → step 12
    { from: { x: 400, y: 190 }, to: { x: 100, y: 190 }, type: 'elbow' },         // Left rail
    { from: { x: 100, y: 190 }, to: { x: 100, y: 280 }, type: 'vertical' },      // Left branch → step 11
    { from: { x: 400, y: 190 }, to: { x: 700, y: 190 }, type: 'elbow' },         // Right rail
    { from: { x: 700, y: 190 }, to: { x: 700, y: 280 }, type: 'vertical' },      // Right branch → step 13

    // Convergence AND — steps 11, 12, 13 → AND bars (at y=420)
    { from: { x: 400, y: 320 }, to: { x: 400, y: 415 }, type: 'vertical' },      // Step 12 → convergence
    { from: { x: 100, y: 320 }, to: { x: 100, y: 415 }, type: 'vertical' },      // Step 11 → convergence
    { from: { x: 700, y: 320 }, to: { x: 700, y: 415 }, type: 'vertical' },      // Step 13 → convergence
    { from: { x: 100, y: 415 }, to: { x: 400, y: 415 }, type: 'elbow' },         // Left rail join
    { from: { x: 700, y: 415 }, to: { x: 400, y: 415 }, type: 'elbow' },         // Right rail join

    // Transition t14 (simple bar at y=445) → Step 14
    { from: { x: 400, y: 425.5 }, to: { x: 400, y: 500 }, type: 'vertical' },

    // Step 14 → Transition t_return
    { from: { x: 400, y: 540 }, to: { x: 400, y: 640 }, type: 'vertical' },
  ]
};

export const grafcetUsinage: GrafcetData = {
  title: "SOUS-GRAFCET : USINAGE",
  description: "Interpolation 3 Axes - Boucle itérative",
  viewBox: "0 0 800 900",
  steps: [
    { id: '50', stepNumber: '50', type: 'initial', x: COL_CENTER, y: 50, actions: [{ type: '', content: ["Chargement G-Code", "Current_Point := 0"] }] },
    { id: '51', stepNumber: '51', type: 'regular', x: COL_CENTER, y: 200, actions: [{ type: '', content: ["Approche point départ", "Velocity := 2000 mm/min"] }] },
    { id: '52', stepNumber: '52', type: 'regular', x: COL_CENTER, y: 350, actions: [{ type: '', content: ["Descente Z", "Velocity := 500 mm/min"] }] },
    { id: '53', stepNumber: '53', type: 'regular', x: COL_CENTER, y: 500, actions: [{ type: '', content: ["Usinage interpolé (BOUCLE)", "MC_MoveSuperimposed", "Current_Point++"] }] },
    { id: '54', stepNumber: '54', type: 'regular', x: COL_CENTER, y: 650, actions: [{ type: '', content: ["Fin trajectoire", "Status = 'Terminé'"] }] },
  ],
  transitions: [
    { id: 't50', from: '50', to: '51', condition: "Buffer_Chargé • Max_Points > 0", x: COL_CENTER, y: 125 },
    { id: 't51', from: '51', to: '52', condition: "Position_Atteinte", x: COL_CENTER, y: 275 },
    { id: 't52', from: '52', to: '53', condition: "Z_Contact_Atteint", x: COL_CENTER, y: 425 },
    { id: 't53', from: '53', to: '54', condition: "Current_Point = Max_Points", x: COL_CENTER, y: 575 },
    // Loop transition needs special handling
    { id: 't53_loop', from: '53', to: '53', condition: "Current_Point < Max_Points", x: COL_CENTER - 100, y: 575, labelPos: 'left' },
    {
      id: 't_return_u',
      from: '54',
      to: [],
      condition: "Trajectoire_Terminée",
      x: COL_CENTER,
      y: 750
    }
  ],
  links: [
    { from: { x: COL_CENTER, y: 70 }, to: { x: COL_CENTER, y: 125 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: 125 }, to: { x: COL_CENTER, y: 180 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: 220 }, to: { x: COL_CENTER, y: 275 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: 275 }, to: { x: COL_CENTER, y: 330 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: 370 }, to: { x: COL_CENTER, y: 425 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: 425 }, to: { x: COL_CENTER, y: 480 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: 520 }, to: { x: COL_CENTER, y: 575 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: 575 }, to: { x: COL_CENTER, y: 630 }, type: 'vertical' },
    { from: { x: COL_CENTER, y: 670 }, to: { x: COL_CENTER, y: 750 }, type: 'vertical' },

    // Loop link
    { from: { x: COL_CENTER, y: 520 }, to: { x: COL_CENTER, y: 540 }, type: 'vertical' }, // Start from step 53 bottom
    { from: { x: COL_CENTER, y: 540 }, to: { x: COL_CENTER - 100, y: 540 }, type: 'elbow' }, // Go left
    { from: { x: COL_CENTER - 100, y: 540 }, to: { x: COL_CENTER - 100, y: 575 }, type: 'vertical' }, // Down to transition
    { from: { x: COL_CENTER - 100, y: 575 }, to: { x: COL_CENTER - 100, y: 480 }, type: 'vertical' }, // Up from transition
    { from: { x: COL_CENTER - 100, y: 480 }, to: { x: COL_CENTER, y: 480 }, type: 'elbow' }, // Back to Step 53 top
  ]
};

export const grafcetSecurite: GrafcetData = {
  title: "GRAFCET SÉCURITÉ",
  description: "Surveillance parallèle permanente (Divergence OU)",
  viewBox: "0 0 900 600",
  steps: [
    { id: 'S0', stepNumber: 'S0', type: 'initial', x: 450, y: 50, actions: [{ type: '', content: ["Surveillance active", "Monitor_Arret_Urgence()", "Monitor_Zone()"] }] },
    { id: 'S1', stepNumber: 'S1', type: 'regular', x: 150, y: 250, actions: [{ type: '', content: ["Arrêt d'urgence", "MC_Stop(Tous, Decel:=Max)"] }] },
    { id: 'S2', stepNumber: 'S2', type: 'regular', x: 450, y: 250, actions: [{ type: '', content: ["Zone dépassée", "MC_Stop(Broche)", "Alarme_Zone := TRUE"] }] },
    { id: 'S3', stepNumber: 'S3', type: 'regular', x: 750, y: 250, actions: [{ type: '', content: ["Erreur Drive", "MC_Reset(Axe_Defaut)", "Attente acquittement"] }] },
    { id: 'S4', stepNumber: 'S4', type: 'regular', x: 450, y: 450, actions: [{ type: '', content: ["Réinitialisation", "Reset_Alarmes()", "Status_Sécu = 'OK'"] }] },
  ],
  transitions: [
    { id: 'tS1', from: 'S0', to: 'S1', condition: "Arrêt_Urgence_Activé", x: 150, y: 150, type: 'divergence_or' },
    { id: 'tS2', from: 'S0', to: 'S2', condition: "Position > Max OR Position < Min", x: 450, y: 150, type: 'divergence_or' },
    { id: 'tS3', from: 'S0', to: 'S3', condition: "Erreur_Drive (MC_Power.Error)", x: 750, y: 150, type: 'divergence_or' },

    { id: 'tS4', from: ['S1', 'S2', 'S3'], to: 'S4', condition: "Acquittement_Opérateur • Défaut_Résolu", x: 450, y: 350, type: 'convergence_or' },

    { id: 'tLoop', from: 'S4', to: 'S0', condition: "Reset_Terminé • Sécurités_OK", x: 450, y: 550 },
  ],
  links: [
    { from: { x: 450, y: 70 }, to: { x: 450, y: 100 }, type: 'vertical' },
    // Div OR rail
    { from: { x: 150, y: 100 }, to: { x: 750, y: 100 }, type: 'elbow' },

    { from: { x: 150, y: 100 }, to: { x: 150, y: 150 }, type: 'vertical' }, // to tS1
    { from: { x: 450, y: 100 }, to: { x: 450, y: 150 }, type: 'vertical' }, // to tS2
    { from: { x: 750, y: 100 }, to: { x: 750, y: 150 }, type: 'vertical' }, // to tS3

    { from: { x: 150, y: 150 }, to: { x: 150, y: 230 }, type: 'vertical' }, // tS1 to S1
    { from: { x: 450, y: 150 }, to: { x: 450, y: 230 }, type: 'vertical' }, // tS2 to S2
    { from: { x: 750, y: 150 }, to: { x: 750, y: 230 }, type: 'vertical' }, // tS3 to S3

    // Conv OR
    { from: { x: 150, y: 270 }, to: { x: 150, y: 320 }, type: 'vertical' },
    { from: { x: 450, y: 270 }, to: { x: 450, y: 320 }, type: 'vertical' },
    { from: { x: 750, y: 270 }, to: { x: 750, y: 320 }, type: 'vertical' },

    { from: { x: 150, y: 320 }, to: { x: 750, y: 320 }, type: 'elbow' }, // Convergence Rail
    { from: { x: 450, y: 320 }, to: { x: 450, y: 350 }, type: 'vertical' }, // to Trans
    { from: { x: 450, y: 350 }, to: { x: 450, y: 430 }, type: 'vertical' }, // to S4

    { from: { x: 450, y: 470 }, to: { x: 450, y: 550 }, type: 'vertical' }, // to tLoop

    // Loop S4 -> S0
    { from: { x: 450, y: 550 }, to: { x: 850, y: 550 }, type: 'elbow' },
    { from: { x: 850, y: 550 }, to: { x: 850, y: 70 }, type: 'vertical' },
    { from: { x: 850, y: 70 }, to: { x: 470, y: 70 }, type: 'elbow' },
  ]
};