import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura);
//, {
//     components: {
//         button: {
//             extend: {
//                 main: {
//                     color: '#307095',
//                     inverseColor: '#ffffff',
//                     hover: '#307095',
//                 },
//                 reject: {
//                     color: '#d81b60',
//                     inverseColor: '#ffffff'
//                 },
//                 secondary: {
//                     color: '#6c757d',
//                     inverseColor: '#ffffff'
//                 },
//                 asset: {
//                     color: '#337ab7',
//                     inverseColor: '#ffffff'
//                 }
//             },
//             css: ({ dt }: { dt: any }) => `

//       .p-button-asset {
//         background-color: ${dt('button.asset.color')};;
//         color: ${dt('button.main.inverseColor')};
//       }

//         .btn-main {
//             background-color: #307095;
//             color: var(--bs-white);
//             font-weight: 400;
//             padding: 6px 12px;
//             border-radius: 3px;
//             border: 1px solid transparent;
//         }

//         .btn-main:hover {
//             background: ${dt('button.main.hover')};
//             color: #fff;
//           }

//         .btn-reject {
//           background: ${dt('button.reject.color')};
//           color: ${dt('button.reject.inverseColor')};
//           border-radius: 3px;
//           padding: 6px 12px;
//           font-weight: 400;
//         }

//         .p-button-secondary {
//           background: ${dt('button.secondary.color')};
//           color: ${dt('button.secondary.inverseColor')};
//         }

//         .p-button-clear {
//           background: #f4f4f4;
//           color: #505156;
//           border: 1px solid #ddd;
//         }
//       `
//         },
//         dropdown: {
//             css: () => `
//         .p-dropdown-panel .p-dropdown-items {
//           padding: 0.75rem 0 !important;
//         }
//       `
//         },
//         paginator: {
//             css: () => `
//         .p-paginator .p-paginator-pages .p-paginator-page {
//           border-radius: 50% !important;
//         }
//         .p-paginator {
//           display: flex;
//         }
//         .p-paginator .p-paginator-first {
//           margin-left: auto;
//         }
//       `
//         },
//         inputtext: {
//             css: () => `
//         .p-inputtext {
//           font-size: 13px;
//           color: #555;
//         }
//       `
//         },
//         autocomplete: {
//             css: () => `
//         .p-inputtext .p-autocomplete-input {
//           width: -webkit-fill-available;
//         }
//       `
//         },
//         card: {
//             css: () => `
//         .card {
//           background: var(--surface-card);
//           padding: 2rem;
//           border-radius: 10px;
//           margin-bottom: 1rem;
//           overflow: visible;
//         }
//       `
//         },
//         table: {
//             css: () => `
//               .p-datatable thead tr th {
//                 background-color: #cfe2ff !important; /* Light blue header */
//                 color: #1a1a1a !important; /* Dark text */
//                 font-weight: 600;
//                 font-size: 14px;
//                 text-align: center;
//                 white-space: nowrap;
//               }

//               .p-datatable tbody td {
//                 font-size: 13px;
//                 vertical-align: middle;
//                 white-space: nowrap;
//               }

//               .p-datatable > :not(caption) > * > * {
//                 padding: 8px 10px;
//               }

//               .action-link {
//                 display: inline-flex;
//                 justify-content: center;
//                 align-items: center;
//                 background-color: #0dcaf0;
//                 color: white;
//                 padding: 6px;
//                 border-radius: 4px;
//                 font-size: 14px;
//                 width: 28px;
//                 height: 28px;
//                 text-align: center;
//               }

//               .action-link:hover {
//                 background-color: #0bbbe6;
//                 color: #fff;
//               }

//               .p-datatable .p-datatable-emptymessage td {
//                 text-align: center;
//                 font-style: italic;
//                 color: #777;
//               }
//             `
//           }
//     }
// });

export default MyPreset;
