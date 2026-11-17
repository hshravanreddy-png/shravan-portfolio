import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

export type ToolCategory = 'all' | 'frontend' | 'backend' | 'tools' | 'ai';

export interface TechTool {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'ai';
  color: string;
  viewBox: string;
  path: string;
  radiusDesktop: number; // base radius in px
  radiusMobile: number;
}

export const TECH_TOOLS: TechTool[] = [
  // ── Frontend (8) ──
  {
    id: 'html5',
    name: 'HTML',
    category: 'frontend',
    color: '#E34F26',
    viewBox: '0 0 24 24',
    path: 'M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z',
    radiusDesktop: 43,
    radiusMobile: 32,
  },
  {
    id: 'css3',
    name: 'CSS',
    category: 'frontend',
    color: '#1572B6',
    viewBox: '0 0 24 24',
    path: 'M1.5 0h21l-1.91 21.563L12.005 24l-8.58-2.435L1.5 0zm17.09 5.313L7.1 5.3l.11 1.5h11.17l-.29 3.01H7.55l.13 1.48h10.38l-.42 4.54-5.64 1.56-5.64-1.56-.37-4.14H5.97l.55 6.18 8.48 2.35 8.49-2.35.9-10.15H18.59l-.005.01z',
    radiusDesktop: 43,
    radiusMobile: 32,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    color: '#F7DF1E',
    viewBox: '0 0 24 24',
    path: 'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.621-1.872-.943-.244-.247-.323-.55-.323-.872 0-.69.528-1.127 1.449-1.127.873 0 1.391.322 1.737.943.195.345.31.701.333 1.345l2.678-.173c-.092-1.31-.62-2.414-1.609-3.035-.873-.551-2.046-.782-3.195-.782-1.356 0-2.472.391-3.219 1.127-.85.828-1.287 1.954-1.287 3.242 0 1.287.494 2.345 1.437 3.035.989.736 2.161 1.058 3.552 1.563.851.322 1.403.575 1.678.897.276.322.391.736.391 1.173 0 .782-.609 1.287-1.655 1.287-1.058 0-1.679-.483-2.093-1.264-.253-.483-.345-1.012-.368-1.77l-2.736.161c.08 1.402.609 2.598 1.563 3.334.966.735 2.299 1.058 3.655 1.058 1.495 0 2.76-.368 3.598-1.08 1.012-.874 1.506-2.093 1.506-3.473.011-.173.011-.322 0-.472zM8.841 18.528c-.287.759-.873 1.218-1.747 1.218-.943 0-1.529-.529-1.736-1.563-.092-.46-.115-.989-.115-2.621v-4.644H2.434v4.943c0 2.092.115 2.92.54 3.862.724 1.586 2.253 2.391 4.184 2.391 1.724 0 2.977-.632 3.828-1.897l.138-.207-1.92-1.23-.363.149v-.252z',
    radiusDesktop: 47,
    radiusMobile: 35,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    color: '#3178C6',
    viewBox: '0 0 24 24',
    path: 'M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z',
    radiusDesktop: 47,
    radiusMobile: 35,
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    color: '#61DAFB',
    viewBox: '0 0 24 24',
    path: 'M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z',
    radiusDesktop: 48,
    radiusMobile: 36,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    color: '#FFFFFF',
    viewBox: '0 0 24 24',
    path: 'M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z',
    radiusDesktop: 46,
    radiusMobile: 34,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    color: '#06B6D4',
    viewBox: '0 0 24 24',
    path: 'M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C14.366 10.42 16.213 12 20 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C17.634 6.38 15.787 4.8 12.001 4.8zM6 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C8.366 17.62 10.213 19.2 14 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C11.634 13.58 9.787 12 6 12z',
    radiusDesktop: 44,
    radiusMobile: 33,
  },
  {
    id: 'materialui',
    name: 'Material UI',
    category: 'frontend',
    color: '#007FFF',
    viewBox: '0 0 24 24',
    path: 'M0 2.475v10.39l3 1.733V7.67l6 3.465 6-3.465v3.465l3-1.733V2.475L12 5.94 0 2.475zM24 7.67l-3-1.733-9 5.198v6.93l3 1.733V14.6l6-3.465v3.465l3-1.733V7.67zM12 12.868l-6-3.465v6.93l6 3.465 6-3.465v-6.93l-6 3.465z',
    radiusDesktop: 42,
    radiusMobile: 31,
  },

  // ── Backend (7) ──
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    color: '#5FA04E',
    viewBox: '0 0 24 24',
    path: 'M12 0L1.605 6.005v11.99L12 24l10.395-6.005V6.005L12 0zm7.145 16.48l-7.14 4.125-7.14-4.125V8.29l7.14-4.125 7.14 4.125v8.19zM12 6.645l-5.18 2.995v5.99L12 18.625l5.18-2.995v-5.99L12 6.645z',
    radiusDesktop: 46,
    radiusMobile: 34,
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    color: '#EEEEEE',
    viewBox: '0 0 24 24',
    path: 'M24 18.252c0 .414-.336.75-.75.75h-3.498a.75.75 0 0 1-.57-.264l-3.328-3.996-3.328 3.996a.75.75 0 0 1-.57.264H8.468a.75.75 0 0 1-.57-.264l-4.148-4.978-4.148 4.978a.75.75 0 0 1-.57.264H.75a.75.75 0 0 1-.75-.75v-12.5a.75.75 0 0 1 .75-.75h3.498a.75.75 0 0 1 .57.264l4.148 4.978 4.148-4.978a.75.75 0 0 1 .57-.264h3.498a.75.75 0 0 1 .57.264l3.328 3.996 3.328-3.996a.75.75 0 0 1 .57-.264H23.25c.414 0 .75.336.75.75v12.5z',
    radiusDesktop: 43,
    radiusMobile: 32,
  },
  {
    id: 'java',
    name: 'Java',
    category: 'backend',
    color: '#ED8B00',
    viewBox: '0 0 24 24',
    path: 'M11.266 22.176c-3.767 1.139-6.953-.162-4.542-.977 2.155-.729 3.551-1.373 1.537-2.459-3.771-2.023-8.814-.14-5.201-1.464 2.193-.787 3.578-1.554 1.517-2.673-4.048-2.156-8.583-.541-5.698-1.636 1.79-.696 2.92-1.381 1.151-2.355C-.53 10.428-.544 8.788 1.93 7.828c2.977-1.155 5.922-1.156 8.913-.016.592.23 1.12.43 1.553.585-1.282-1.01-2.822-1.92-4.453-2.698C5.07 4.908 4.14 4.5 4.14 4.5s8.877 1.83 11.751 5.968c2.515 3.633.242 7.712-4.625 11.708zm6.541-11.458c-.687.323-1.439.599-2.222.842 1.025.42 1.996.938 2.899 1.552.417-.751.722-1.547.904-2.394-.555-.02-1.077-.11-1.581-.326zm-1.745 4.316c-3.195 1.341-7.234 2.22-11.233 2.502 1.132 1.977 4.185 2.871 8.211 1.884 2.378-.585 4.168-1.527 3.022-4.386zM8.344 0C5.394.887 3.24 2.553 4.225 3.44c.954.86 3.664.843 6.012 1.082 2.348.239 4.332.96 4.907 1.758.825 1.137-.923 2.148-3.056 2.827-2.368.751-5.115 1.157-7.262 2.302-2.383 1.283-2.613 3.425-.631 4.707 2.183 1.42 5.923 1.889 9.387 1.353 3.464-.537 6.403-1.964 6.558-4.041.242-3.238-3.208-6.192-7.552-7.668C9.539 4.542 7.92 3.902 8.344 0z',
    radiusDesktop: 42,
    radiusMobile: 31,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    color: '#3776AB',
    viewBox: '0 0 24 24',
    path: 'M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z',
    radiusDesktop: 46,
    radiusMobile: 35,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'backend',
    color: '#4169E1',
    viewBox: '0 0 24 24',
    path: 'M12 0C5.373 0 0 5.373 0 12c0 4.418 2.472 8.27 6.12 10.315.112.062.224.116.342.164-3.327-2.614-5.462-6.726-5.462-11.379C1 5.925 5.925 1 12 1s11 4.925 11 11c0 4.653-2.135 8.765-5.462 11.379.118-.048.23-.102.342-.164C21.528 20.27 24 16.418 24 12c0-6.627-5.373-12-12-12zm-3.235 5.342c.319-.047.652-.07.994-.07 3.325 0 6.03 2.375 6.03 5.3 0 .42-.055.828-.158 1.22 1.342.42 2.316 1.583 2.316 3.01 0 1.74-1.48 3.15-3.305 3.15-1.125 0-2.115-.572-2.705-1.432-1.107.56-2.42.887-3.81.887-4.14 0-7.5-2.685-7.5-6 0-3.05 3.09-5.55 6.9-5.835z',
    radiusDesktop: 47,
    radiusMobile: 35,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'backend',
    color: '#47A248',
    viewBox: '0 0 24 24',
    path: 'M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.613-.478-.9-.62-.9-.142 0-.34.287-.62.9-.321.701-3.309 2.535-4.573 8.115-1.423 6.285 1.879 10.971 4.547 13.578.43.421.758.784.646.867-.113.082-.603-.13-1.042-.327-2.684-1.205-5.111-4.08-5.111-8.52 0-5.607 3.44-9.5 5.5-11.458.204-.194.4-.37.58-.528.21-.183.41-.347.572-.468.163.121.363.285.573.468.18.158.375.334.58.528 2.06 1.958 5.5 5.851 5.5 11.458 0 4.44-2.427 7.315-5.111 8.52-.439.197-.929.409-1.042.327-.112-.083.216-.446.646-.867 2.668-2.607 5.97-7.293 4.547-13.578z',
    radiusDesktop: 43,
    radiusMobile: 32,
  },
  {
    id: 'prisma',
    name: 'Prisma',
    category: 'backend',
    color: '#5A67D8',
    viewBox: '0 0 24 24',
    path: 'M2.43 1.25L0 5.34l12 17.41L24 5.34l-2.43-4.09H2.43zm2.57 2.17h14l-7 12.33-7-12.33z',
    radiusDesktop: 38,
    radiusMobile: 28,
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'backend',
    color: '#3ECF8E',
    viewBox: '0 0 24 24',
    path: 'M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.29 11.235a.4.4 0 0 0 .302.651h9.354v8.958c0 .35.4.532.652.292l8.994-11.072a.4.4 0 0 0-.33-.652Z',
    radiusDesktop: 44,
    radiusMobile: 33,
  },

  // ── Development Tools (5) ──
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    color: '#007ACC',
    viewBox: '0 0 24 24',
    path: 'M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.13-3.13a1.05 1.05 0 0 0-1.42.13L.35 7.42a1.05 1.05 0 0 0 .11 1.42l3.41 3.03-3.41 3.03a1.05 1.05 0 0 0-.11 1.42l1.15 1.32a1.05 1.05 0 0 0 1.42.13l4.13-3.13 9.46 8.63a1.494 1.494 0 0 0 1.705.29l4.94-2.377a1.5 1.5 0 0 0 .85-1.35V3.937a1.5 1.5 0 0 0-.85-1.35zM17.06 17.77l-7.79-6.77 7.79-6.77v13.54z',
    radiusDesktop: 44,
    radiusMobile: 32,
  },
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    color: '#F05032',
    viewBox: '0 0 24 24',
    path: 'M23.546 10.93L13.067.452c-.674-.674-1.76-.674-2.434 0L8.904 2.181l3.55 3.55a3.032 3.032 0 0 1 2.946 3.125 3.03 3.03 0 0 1-2.924 3.12 3.033 3.033 0 0 1-3.136-2.935l-3.5 3.502a1.722 1.722 0 0 0 0 2.437l10.479 10.48c.674.674 1.76.674 2.434 0l10.479-10.48c.674-.674.674-1.76 0-2.434zM5.38 10.638a3.033 3.033 0 0 1 3.03-3.03c1.674 0 3.03 1.356 3.03 3.03s-1.356 3.03-3.03 3.03c-1.674 0-3.03-1.356-3.03-3.03z',
    radiusDesktop: 42,
    radiusMobile: 31,
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools',
    color: '#FFFFFF',
    viewBox: '0 0 24 24',
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    radiusDesktop: 44,
    radiusMobile: 33,
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'tools',
    color: '#646CFF',
    viewBox: '0 0 24 24',
    path: 'm23.42 3.86-10.74 19.3a.8.8 0 0 1-1.36 0L.58 3.86A.8.8 0 0 1 1.28 2.7l10.22 1.86a.8.8 0 0 0 .98-.2L22.7 2.7a.8.8 0 0 1 .72 1.16zM15.5 2.94 12 10.5 8.5 2.94 1.9 1.76l9.6 17.26 9.6-17.26-5.6 1.18z',
    radiusDesktop: 43,
    radiusMobile: 32,
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'tools',
    color: '#FFFFFF',
    viewBox: '0 0 24 24',
    path: 'M24 22.5H0l12-20.784z',
    radiusDesktop: 44,
    radiusMobile: 33,
  },

  // ── AI Tools (2) ──
  {
    id: 'claude',
    name: 'Claude',
    category: 'ai',
    color: '#D97757',
    viewBox: '0 0 24 24',
    path: 'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z',
    radiusDesktop: 48,
    radiusMobile: 36,
  },
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'ai',
    color: '#10A37F',
    viewBox: '0 0 24 24',
    path: 'M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z',
    radiusDesktop: 48,
    radiusMobile: 36,
  },
];

interface PhysicsBubble {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'ai';
  color: string;
  viewBox: string;
  path: string;
  r: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  targetScale: number;
  opacity: number;
  targetOpacity: number;
  phase: number;
  floatSpeed: number;
  isDragging: boolean;
  dragHistory: { x: number; y: number; time: number }[];
}

export default function EngineRoomSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const bubbleDomRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Physics simulation data
  const bubblesRef = useRef<PhysicsBubble[]>([]);
  const dimensionsRef = useRef<{ w: number; h: number }>({ w: 1000, h: 600 });
  const rafIdRef = useRef<number | null>(null);
  const isInteractingRef = useRef<boolean>(false);
  const isInViewportRef = useRef<boolean>(false);
  const prefersReducedMotionRef = useRef<boolean>(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotionRef.current = mq.matches;
      const handler = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches;
      };
      mq.addEventListener?.('change', handler);
      return () => mq.removeEventListener?.('change', handler);
    }
  }, []);

  // IntersectionObserver to pause/resume animation when offscreen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewportRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Initialize bubbles positions and sizes
  const initBubbles = useCallback((w: number, h: number) => {
    const isMobile = w < 640;
    const isTablet = w >= 640 && w < 1024;
    const sizeMultiplier = isMobile ? 0.76 : isTablet ? 0.9 : 1.0;

    const centerX = w / 2;
    const centerY = h / 2;

    // Golden angle spiral distribution for initial organic clusters
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    bubblesRef.current = TECH_TOOLS.map((tool, index) => {
      const baseR = isMobile ? tool.radiusMobile : tool.radiusDesktop;
      const r = Math.round(baseR * sizeMultiplier);

      // Distance from center expands organically with index
      const radiusStep = Math.min(w, h) * 0.058;
      const dist = Math.sqrt(index + 1) * radiusStep * 1.05;
      const angle = index * goldenAngle + (index % 2 === 0 ? 0.2 : -0.2);

      // Jitter so it does not feel mathematical
      const jitterX = Math.sin(index * 2.3) * 16;
      const jitterY = Math.cos(index * 1.7) * 16;

      const x = Math.min(Math.max(centerX + Math.cos(angle) * dist + jitterX, r + 20), w - r - 20);
      const y = Math.min(Math.max(centerY + Math.sin(angle) * dist * 0.78 + jitterY, r + 20), h - r - 20);

      return {
        id: tool.id,
        name: tool.name,
        category: tool.category,
        color: tool.color,
        viewBox: tool.viewBox,
        path: tool.path,
        r,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        scale: 1,
        targetScale: 1,
        opacity: 1,
        targetOpacity: 1,
        phase: Math.random() * Math.PI * 2,
        floatSpeed: 0.6 + Math.random() * 0.8,
        isDragging: false,
        dragHistory: [],
      };
    });
  }, []);

  // ResizeObserver to track canvas container dimensions
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);

      if (w > 0 && h > 0) {
        dimensionsRef.current = { w, h };
        if (bubblesRef.current.length !== TECH_TOOLS.length) {
          initBubbles(w, h);
          bubblesRef.current.forEach((b) => {
            const inCategory = activeCategory === 'all' || b.category === activeCategory;
            b.targetScale = inCategory ? 1 : 0.001;
            b.targetOpacity = inCategory ? 1 : 0;
            b.scale = inCategory ? 1 : 0.001;
            b.opacity = inCategory ? 1 : 0;
          });
        } else {
          // Adjust bubble radii and boundary containment on resize
          const isMobile = w < 640;
          const isTablet = w >= 640 && w < 1024;
          const sizeMultiplier = isMobile ? 0.76 : isTablet ? 0.9 : 1.0;

          bubblesRef.current.forEach((b) => {
            const tool = TECH_TOOLS.find((t) => t.id === b.id);
            if (tool) {
              const baseR = isMobile ? tool.radiusMobile : tool.radiusDesktop;
              b.r = Math.round(baseR * sizeMultiplier);
              b.x = Math.min(Math.max(b.x, b.r + 10), w - b.r - 10);
              b.y = Math.min(Math.max(b.y, b.r + 10), h - b.r - 10);
            }
          });
        }
      }
    };

    updateDimensions();

    const ro = new ResizeObserver(updateDimensions);
    ro.observe(container);

    window.addEventListener('resize', updateDimensions);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [initBubbles]);

  // Synchronize category target state
  useEffect(() => {
    bubblesRef.current.forEach((b) => {
      const inCategory = activeCategory === 'all' || b.category === activeCategory;
      b.targetScale = inCategory ? 1 : 0.001;
      b.targetOpacity = inCategory ? 1 : 0;
    });
  }, [activeCategory]);

  // Main 60/120fps physics loop (zero React re-renders)
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      // 1. Precise delta time normalized around 60fps (~0.0166s), clamped to avoid large jumps
      const rawDt = (time - lastTime) / 1000;
      const dt = Math.min(Math.max(rawDt, 0.001), 0.033);
      lastTime = time;

      const dtScale = dt * 60; // 1.0 at 60Hz, 0.5 at 120Hz

      const { w, h } = dimensionsRef.current;
      const bubbles = bubblesRef.current;
      const numBubbles = bubbles.length;
      const reducedMotion = prefersReducedMotionRef.current;

      if (isInViewportRef.current && w > 0 && h > 0 && numBubbles > 0) {
        const centerX = w / 2;
        const centerY = h / 2;
        const pad = 16;

        // Step A: Update scales, opacities, and natural ambient harmonic forces
        for (let i = 0; i < numBubbles; i++) {
          const b = bubbles[i];

          // Smooth lerp for category transitions (exponential decay)
          b.scale += (b.targetScale - b.scale) * (1 - Math.pow(0.82, dtScale));
          b.opacity += (b.targetOpacity - b.opacity) * (1 - Math.pow(0.82, dtScale));

          if (b.opacity < 0.01) continue;

          if (!b.isDragging) {
            if (!reducedMotion) {
              // 1. Gentle multi-phase organic harmonic float
              const floatAngle = time * 0.00075 * b.floatSpeed + b.phase;
              b.vx += Math.cos(floatAngle) * 0.032 * dtScale;
              b.vy += Math.sin(floatAngle * 0.82) * 0.032 * dtScale;

              // 2. Soft center gravitational tether (keeps ecosystem cohesive)
              const dxCenter = centerX - b.x;
              const dyCenter = centerY - b.y;
              b.vx += dxCenter * 0.00018 * dtScale;
              b.vy += dyCenter * 0.00018 * dtScale;
            }

            // 3. Fluid viscous damping (smooth exponential settling)
            const damping = Math.pow(0.92, dtScale);
            b.vx *= damping;
            b.vy *= damping;

            // Speed limit (gentle ceiling, prevents ballistic scatter)
            const speed = Math.hypot(b.vx, b.vy);
            if (speed > 12) {
              b.vx = (b.vx / speed) * 12;
              b.vy = (b.vy / speed) * 12;
            } else if (speed < 0.015) {
              // Smooth rest state to eliminate micro-jitter
              b.vx = 0;
              b.vy = 0;
            }

            // Position integration
            b.x += b.vx * dtScale;
            b.y += b.vy * dtScale;

            // 4. Soft boundary repulsion (cushioned deceleration instead of hard bounce)
            const curR = b.r * b.scale;
            if (b.x - curR < pad) {
              const depth = pad - (b.x - curR);
              b.vx += depth * 0.14 * dtScale;
              b.x += depth * 0.22 * dtScale;
              b.vx *= 0.75;
            } else if (b.x + curR > w - pad) {
              const depth = (b.x + curR) - (w - pad);
              b.vx -= depth * 0.14 * dtScale;
              b.x -= depth * 0.22 * dtScale;
              b.vx *= 0.75;
            }

            if (b.y - curR < pad) {
              const depth = pad - (b.y - curR);
              b.vy += depth * 0.14 * dtScale;
              b.y += depth * 0.22 * dtScale;
              b.vy *= 0.75;
            } else if (b.y + curR > h - pad) {
              const depth = (b.y + curR) - (h - pad);
              b.vy -= depth * 0.14 * dtScale;
              b.y -= depth * 0.22 * dtScale;
              b.vy *= 0.75;
            }
          }
        }

        // Step B: Multi-body fluid collision response & progressive relaxation
        // 2 relaxation sub-iterations per frame: guarantees zero overlap with zero sudden snaps
        const iterations = 2;
        for (let iter = 0; iter < iterations; iter++) {
          for (let i = 0; i < numBubbles; i++) {
            const b1 = bubbles[i];
            if (b1.opacity < 0.05) continue;

            for (let j = i + 1; j < numBubbles; j++) {
              const b2 = bubbles[j];
              if (b2.opacity < 0.05) continue;

              const dx = b2.x - b1.x;
              const dy = b2.y - b1.y;
              const distSq = dx * dx + dy * dy;
              const r1 = b1.r * b1.scale;
              const r2 = b2.r * b2.scale;
              const minDist = r1 + r2 + 4; // Comfortable cushion

              // Fluid proximity distance: nearby bubbles feel each other smoothly before hard overlap
              const proximityDist = minDist + 16;
              const proxSq = proximityDist * proximityDist;

              if (distSq < proxSq && distSq > 0.0001) {
                const dist = Math.sqrt(distSq);
                const nx = dx / dist;
                const ny = dy / dist;

                // 1. Soft proximity cushion: creates connected, fluid feeling between neighbors
                if (dist >= minDist && iter === 0) {
                  const factor = (proximityDist - dist) / 16; // 0 to 1
                  const softForce = factor * 0.035 * dtScale;
                  if (!b1.isDragging) {
                    b1.vx -= nx * softForce;
                    b1.vy -= ny * softForce;
                  }
                  if (!b2.isDragging) {
                    b2.vx += nx * softForce;
                    b2.vy += ny * softForce;
                  }
                }

                // 2. Physical collision / Overlap resolution
                if (dist < minDist) {
                  const overlap = minDist - dist;

                  // Smooth positional relaxation (fractional per iteration to eliminate sudden jumps)
                  const relaxRate = (iter === 0 ? 0.24 : 0.32) * dtScale;

                  if (!b1.isDragging && !b2.isDragging) {
                    // Both are floating: share displacement equally
                    const sep = overlap * 0.5 * relaxRate;
                    b1.x -= nx * sep;
                    b1.y -= ny * sep;
                    b2.x += nx * sep;
                    b2.y += ny * sep;

                    // Relative velocity damping (absorbs jitter)
                    if (iter === 0) {
                      const relVx = b2.vx - b1.vx;
                      const relVy = b2.vy - b1.vy;
                      const normalVel = relVx * nx + relVy * ny;

                      if (normalVel < 0) {
                        const restitution = 0.25; // Soft organic rebound
                        const impulse = -(1 + restitution) * normalVel * 0.35;
                        b1.vx -= nx * impulse;
                        b1.vy -= ny * impulse;
                        b2.vx += nx * impulse;
                        b2.vy += ny * impulse;
                      }

                      // Small tangential friction to prevent chaotic sliding
                      b1.vx *= 0.985;
                      b1.vy *= 0.985;
                      b2.vx *= 0.985;
                      b2.vy *= 0.985;
                    }
                  } else if (b1.isDragging) {
                    // b1 is pushed by user: b2 gently yields and moves away
                    const sep = overlap * relaxRate * 1.25;
                    b2.x += nx * sep;
                    b2.y += ny * sep;

                    if (iter === 0) {
                      // Transfer a controlled fraction of user drag momentum to b2
                      const dragSpeed = Math.hypot(b1.vx, b1.vy);
                      const pushMag = Math.min(overlap * 0.15 + dragSpeed * 0.12, 4.0);
                      b2.vx += (nx * pushMag + b1.vx * 0.08) * dtScale;
                      b2.vy += (ny * pushMag + b1.vy * 0.08) * dtScale;
                    }
                  } else if (b2.isDragging) {
                    // b2 is pushed by user: b1 gently yields and moves away
                    const sep = overlap * relaxRate * 1.25;
                    b1.x -= nx * sep;
                    b1.y -= ny * sep;

                    if (iter === 0) {
                      const dragSpeed = Math.hypot(b2.vx, b2.vy);
                      const pushMag = Math.min(overlap * 0.15 + dragSpeed * 0.12, 4.0);
                      b1.vx -= (nx * pushMag - b2.vx * 0.08) * dtScale;
                      b1.vy -= (ny * pushMag - b2.vy * 0.08) * dtScale;
                    }
                  }
                }
              }
            }
          }
        }

        // Step C: Direct DOM update without triggering React re-renders
        for (let i = 0; i < numBubbles; i++) {
          const b = bubbles[i];
          const el = bubbleDomRefs.current.get(b.id);
          if (el) {
            const renderR = b.r;
            const posX = Math.round(b.x - renderR);
            const posY = Math.round(b.y - renderR);
            const scaleVal = b.scale.toFixed(3);
            const opacityVal = b.opacity.toFixed(3);

            el.style.transform = `translate3d(${posX}px, ${posY}px, 0px) scale(${scaleVal})`;
            el.style.opacity = opacityVal;
            el.style.pointerEvents = b.opacity < 0.15 ? 'none' : 'auto';
            el.style.zIndex = b.isDragging ? '45' : selectedToolId === b.id ? '40' : '20';
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [selectedToolId]);

  // Pointer drag interactions (supports mouse, trackpad, and touch)
  const handlePointerDown = (toolId: string, e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const targetEl = e.currentTarget;
    const pointerId = e.pointerId;

    try {
      targetEl.setPointerCapture(pointerId);
    } catch (err) {
      // Ignored if capture unsupported
    }

    const container = canvasContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    const b = bubblesRef.current.find((item) => item.id === toolId);
    if (!b) return;

    b.isDragging = true;
    isInteractingRef.current = true;
    setSelectedToolId(b.id);

    b.vx = 0;
    b.vy = 0;
    const now = performance.now();
    const curX = e.clientX - rect.left;
    const curY = e.clientY - rect.top;

    b.dragHistory = [{ x: curX, y: curY, time: now }];

    const handlePointerMove = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId || !b.isDragging) return;
      const cRect = container.getBoundingClientRect();
      const nx = ev.clientX - cRect.left;
      const ny = ev.clientY - cRect.top;

      const curTime = performance.now();
      const last = b.dragHistory[b.dragHistory.length - 1];
      if (last) {
        const dtMove = (curTime - last.time) / 1000;
        if (dtMove > 0.001) {
          // Instantaneous drag speed with gentle moving average
          const instVx = ((nx - last.x) / dtMove) * 0.035;
          const instVy = ((ny - last.y) / dtMove) * 0.035;
          b.vx = b.vx * 0.35 + instVx * 0.65;
          b.vy = b.vy * 0.35 + instVy * 0.65;
        }
      }

      b.x = nx;
      b.y = ny;

      b.dragHistory.push({ x: nx, y: ny, time: curTime });
      if (b.dragHistory.length > 6) {
        b.dragHistory.shift();
      }
    };

    const handlePointerUp = (ev: PointerEvent) => {
      if (ev.pointerId !== pointerId) return;

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);

      try {
        targetEl.releasePointerCapture(pointerId);
      } catch (err) {
        // Ignored
      }

      b.isDragging = false;
      isInteractingRef.current = false;

      // Natural flick / momentum calculation from recent drag history
      if (b.dragHistory.length >= 2) {
        const last = b.dragHistory[b.dragHistory.length - 1];
        const oldest = b.dragHistory[0];
        const timeDiff = (last.time - oldest.time) / 1000;

        if (timeDiff > 0.01 && timeDiff < 0.28) {
          const vxCalc = ((last.x - oldest.x) / timeDiff) * 0.042;
          const vyCalc = ((last.y - oldest.y) / timeDiff) * 0.042;

          // Apply natural flick momentum with smooth ceiling
          b.vx = Math.max(Math.min(vxCalc, 11), -11);
          b.vy = Math.max(Math.min(vyCalc, 11), -11);
        }
      }
      b.dragHistory = [];
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: false });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
  };

  // Category filter counts
  const categoryCounts = useMemo(() => {
    return {
      all: TECH_TOOLS.length,
      frontend: TECH_TOOLS.filter((t) => t.category === 'frontend').length,
      backend: TECH_TOOLS.filter((t) => t.category === 'backend').length,
      tools: TECH_TOOLS.filter((t) => t.category === 'tools').length,
      ai: TECH_TOOLS.filter((t) => t.category === 'ai').length,
    };
  }, []);

  const categories: { key: ToolCategory; label: string; count: number }[] = [
    { key: 'all', label: `ALL ${categoryCounts.all}`, count: categoryCounts.all },
    { key: 'frontend', label: 'FRONTEND', count: categoryCounts.frontend },
    { key: 'backend', label: 'BACKEND', count: categoryCounts.backend },
    { key: 'tools', label: 'TOOLS', count: categoryCounts.tools },
    { key: 'ai', label: 'AI', count: categoryCounts.ai },
  ];

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#000000] text-black pt-12 pb-28 sm:pt-16 sm:pb-36 lg:pt-20 lg:pb-44 border-t border-black/15 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/engine-room-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Identifier */}
        <div
          className={`flex items-center gap-3 font-mono text-xs sm:text-[13px] tracking-[0.25em] text-white font-semibold uppercase mb-4 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="w-6 h-[1.5px] bg-white rounded-full inline-block" aria-hidden="true" />
          <span>MY TOOLS</span>
        </div>

        {/* Section Heading & Category Navigation Bar */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-12 lg:mb-14 transition-all duration-700 delay-100 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Large Editorial Heading */}
          <div>
            <h2 className="font-sora font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-[-0.03em] text-black">
              The Engine{' '}
              <span className="inline-flex items-center gap-3 sm:gap-4 md:gap-5 whitespace-nowrap">
                <span>Room</span>
                <span
                  className="inline-block w-8 sm:w-11 md:w-14 h-[3px] sm:h-[3.5px] md:h-[4px] rounded-full bg-black flex-shrink-0"
                  aria-hidden="true"
                />
              </span>
            </h2>
            <p className="font-sora text-sm sm:text-base text-white font-normal mt-2 max-w-xl">
              An interactive ecosystem of modern engineering frameworks, scalable backend architectures, and applied AI tools.
            </p>
          </div>

          {/* Category Navigation Pills */}
          <div className="h-[34px] flex items-center gap-0.5 sm:gap-1 px-2 py-1 rounded-full bg-black/[0.08] border border-black/20 backdrop-blur-md shadow-sm self-start lg:self-auto overflow-x-auto max-w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`h-[24px] group relative shrink-0 whitespace-nowrap px-2 sm:px-2.5 lg:px-3 rounded-full font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider transition-all duration-300 flex items-center justify-center select-none ${
                    isActive
                      ? 'bg-black/15 text-black shadow-sm border border-black/40'
                      : 'text-white hover:text-white/80 hover:bg-black/[0.08] border border-transparent'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main Interactive Canvas: The Engine Room ── */}
        <div
          ref={canvasContainerRef}
          className={`relative w-full h-[540px] sm:h-[600px] lg:h-[650px] rounded-2xl sm:rounded-3xl border border-white/[0.12] bg-[#000000] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] select-none touch-none transition-all duration-700 delay-200 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ willChange: 'transform' }}
        >
          {/* Futuristic subtle grid & concentric depth rings */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px]"
            aria-hidden="true"
          />

          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle cx="50%" cy="50%" r="140" fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />
            <circle cx="50%" cy="50%" r="240" fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="6 8" />
            <circle cx="50%" cy="50%" r="340" fill="none" stroke="rgba(255,255,255,0.03)" />
          </svg>

          {/* Floating Technology Glass Bubbles */}
          {TECH_TOOLS.map((tool) => {
            const isSelected = selectedToolId === tool.id;

            return (
              <div
                key={tool.id}
                ref={(el) => {
                  if (el) {
                    bubbleDomRefs.current.set(tool.id, el);
                  } else {
                    bubbleDomRefs.current.delete(tool.id);
                  }
                }}
                onPointerDown={(e) => handlePointerDown(tool.id, e)}
                onClick={() => setSelectedToolId(tool.id)}
                role="button"
                tabIndex={0}
                aria-label={`${tool.name} bubble`}
                className="group absolute top-0 left-0 cursor-grab active:cursor-grabbing rounded-full transition-[box-shadow,border-color] duration-300 select-none will-change-transform"
                style={{
                  width: `${(tool.radiusDesktop || 42) * 2}px`,
                  height: `${(tool.radiusDesktop || 42) * 2}px`,
                }}
              >
                {/* Glass Sphere Body */}
                <div
                  className={`pointer-events-none relative w-full h-full rounded-full flex flex-col items-center justify-center p-2 backdrop-blur-xl border transition-all duration-300 ${
                    isSelected
                      ? 'border-white/50 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.5),0_0_20px_rgba(255,255,255,0.15),0_12px_28px_rgba(0,0,0,0.8)] bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-black/70 scale-[1.04]'
                      : 'border-white/[0.16] group-hover:border-white/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.35),0_12px_28px_rgba(0,0,0,0.6)] group-hover:shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.5),0_0_20px_rgba(255,255,255,0.12),0_12px_28px_rgba(0,0,0,0.7)] bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-black/60 group-hover:bg-gradient-to-b group-hover:from-white/[0.12] group-hover:via-white/[0.04] group-hover:to-black/60 group-hover:scale-[1.04]'
                  }`}
                >
                  {/* Official Brand Logo */}
                  <div className="relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mb-1 transition-transform duration-300 group-hover:scale-105 pointer-events-none">
                    <svg
                      viewBox={tool.viewBox}
                      className="w-full h-full drop-shadow-md transition-all duration-300 pointer-events-none"
                      fill="currentColor"
                      style={{
                        color: tool.color === '#FFFFFF' ? '#F5F5F5' : tool.color,
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                      }}
                      aria-hidden="true"
                    >
                      <path d={tool.path} />
                    </svg>
                  </div>

                  {/* Tiny Technology Name */}
                  <span className="font-mono text-[8.5px] sm:text-[9.5px] tracking-tight text-white/95 font-medium select-none text-center leading-tight px-1 max-w-full pointer-events-none break-words">
                    {tool.name}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Bottom Instruction Pill: POKE · DRAG · FLICK */}
          <div className="pointer-events-none absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-white/[0.1] backdrop-blur-md shadow-lg select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7518] shadow-[0_0_8px_#FF7518] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-white/60 font-medium">
              POKE · DRAG · FLICK
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
