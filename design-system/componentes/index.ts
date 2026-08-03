/**
 * ─────────────────────────────────────────────────────────────
 * Nephos · Índice de componentes (semente do catálogo do Moses)
 * ─────────────────────────────────────────────────────────────
 * Reúne todos os `*.meta.ts` num só lugar. É o ponto que um passo de
 * build vai agregar num `nephos-index.json` — a fonte que o MCP/skill do
 * Moses consulta para escolher o componente certo.
 *
 * Ao adicionar um componente novo: criar o `<id>.meta.ts` e registrar aqui.
 * ─────────────────────────────────────────────────────────────
 */

import type { NephosComponentMeta } from './component-meta.type';

import { buttonMeta } from './button.meta';
import { inputTextMeta } from './inputtext.meta';
import { floatLabelMeta } from './floatlabel.meta';
import { cardMeta } from './card.meta';
import { selectMeta } from './select.meta';
import { checkboxMeta } from './checkbox.meta';
import { radioButtonMeta } from './radiobutton.meta';
import { passwordMeta } from './password.meta';
import { messageMeta } from './message.meta';
import { toastMeta } from './toast.meta';
import { dialogMeta } from './dialog.meta';
import { tagMeta } from './tag.meta';
import { loginFormBlockMeta } from './login-form.block.meta';
import { emptyStateBlockMeta } from './empty-state.block.meta';
import { destructiveConfirmBlockMeta } from './destructive-confirm.block.meta';
import { searchFiltersBlockMeta } from './search-filters.block.meta';
import { headerBlockMeta } from './header.block.meta';
import { sidebarBlockMeta } from './sidebar.block.meta';
import { dataTableBlockMeta } from './data-table.block.meta';

// Templates (category: 'layout') — a moldura e as páginas
import { appShellTemplateMeta } from './app-shell.template.meta';
import { listingTemplateMeta } from './listing.template.meta';
import { authTemplateMeta } from './auth.template.meta';
import { detailFormTemplateMeta } from './detail-form.template.meta';
import { dashboardTemplateMeta } from './dashboard.template.meta';

// Onda 1 — átomos primitivos (HTML semântico + tipografia/cor Nephos; icon = PrimeIcons)
import { linkMeta } from './link.meta';
import { labelMeta } from './label.meta';
import { headingMeta } from './heading.meta';
import { textMeta } from './text.meta';
import { helperTextMeta } from './helper-text.meta';
import { iconMeta } from './icon.meta';

// Onda 2 — componentes PrimeNG de alta frequência (API real do .d.ts)
import { textareaMeta } from './textarea.meta';
import { toggleSwitchMeta } from './toggleswitch.meta';
import { sliderMeta } from './slider.meta';
import { dividerMeta } from './divider.meta';
import { badgeMeta } from './badge.meta';
import { skeletonMeta } from './skeleton.meta';
import { progressBarMeta } from './progressbar.meta';
import { imageMeta } from './image.meta';
import { progressSpinnerMeta } from './progressspinner.meta';
import { tooltipMeta } from './tooltip.meta';

// Onda 4 — navegação (componentes-pai; o "item" é parte, não ficha própria)
import { breadcrumbMeta } from './breadcrumb.meta';
import { tabsMeta } from './tabs.meta';
import { paginatorMeta } from './paginator.meta';
import { menuMeta } from './menu.meta';
import { menubarMeta } from './menubar.meta';

// Onda 3 — entrada avançada (o "time picker" é o modo timeOnly do datepicker)
import { datePickerMeta } from './datepicker.meta';
import { fileUploadMeta } from './fileupload.meta';

// Onda 2 (restante) + Onda 5 — destravados após a decisão Font Awesome
import { avatarMeta } from './avatar.meta';
import { chipMeta } from './chip.meta';
import { iconButtonMeta } from './icon-button.meta';
import { searchInputMeta } from './search-input.meta';
import { logoMeta } from './logo.meta';
import { themeToggleMeta } from './theme-toggle.meta';

// Onda "Dados" — componentes de dados (os grandes que faltavam no kit)
import { dataTableMeta } from './datatable.meta';
import { dataViewMeta } from './dataview.meta';

// Onda "Formulário avançado" — campos que faltavam no kit
import { inputNumberMeta } from './inputnumber.meta';
import { autoCompleteMeta } from './autocomplete.meta';
import { multiSelectMeta } from './multiselect.meta';
import { selectButtonMeta } from './selectbutton.meta';
import { toggleButtonMeta } from './togglebutton.meta';
import { inputMaskMeta } from './inputmask.meta';

// Onda "Painéis/estrutura"
import { accordionMeta } from './accordion.meta';
import { stepperMeta } from './stepper.meta';
import { toolbarMeta } from './toolbar.meta';

// Onda "Sobreposições"
import { confirmDialogMeta } from './confirmdialog.meta';
import { drawerMeta } from './drawer.meta';
import { popoverMeta } from './popover.meta';

// Onda "Catálogo completo" — os 43 componentes PrimeNG restantes (workflow, API real do .d.ts)
// Menus
import { contextMenuMeta } from './contextmenu.meta';
import { megaMenuMeta } from './megamenu.meta';
import { tieredMenuMeta } from './tieredmenu.meta';
import { panelMenuMeta } from './panelmenu.meta';
import { dockMeta } from './dock.meta';
import { speedDialMeta } from './speeddial.meta';
// Dados / hierarquia
import { treeMeta } from './tree.meta';
import { treeTableMeta } from './treetable.meta';
import { treeSelectMeta } from './treeselect.meta';
import { orderListMeta } from './orderlist.meta';
import { pickListMeta } from './picklist.meta';
import { organizationChartMeta } from './organizationchart.meta';
import { timelineMeta } from './timeline.meta';
import { carouselMeta } from './carousel.meta';
import { galleriaMeta } from './galleria.meta';
// Campos de seleção / entradas especiais
import { cascadeSelectMeta } from './cascadeselect.meta';
import { listboxMeta } from './listbox.meta';
import { ratingMeta } from './rating.meta';
import { knobMeta } from './knob.meta';
import { colorPickerMeta } from './colorpicker.meta';
import { inputOtpMeta } from './inputotp.meta';
import { editorMeta } from './editor.meta';
// Painéis / estrutura
import { panelMeta } from './panel.meta';
import { fieldsetMeta } from './fieldset.meta';
import { splitterMeta } from './splitter.meta';
import { scrollPanelMeta } from './scrollpanel.meta';
import { inplaceMeta } from './inplace.meta';
// Sobreposições / feedback
import { confirmPopupMeta } from './confirmpopup.meta';
import { dynamicDialogMeta } from './dynamicdialog.meta';
import { meterGroupMeta } from './metergroup.meta';
import { blockUiMeta } from './blockui.meta';
import { scrollTopMeta } from './scrolltop.meta';
// Composição / helpers
import { inputGroupMeta } from './inputgroup.meta';
import { inputGroupAddonMeta } from './inputgroupaddon.meta';
import { iftaLabelMeta } from './iftalabel.meta';
import { avatarGroupMeta } from './avatargroup.meta';
import { overlayBadgeMeta } from './overlaybadge.meta';
// Botões compostos
import { splitButtonMeta } from './splitbutton.meta';
import { buttonGroupMeta } from './buttongroup.meta';
// Nicho
import { chartMeta } from './chart.meta';
import { terminalMeta } from './terminal.meta';
import { imageCompareMeta } from './imagecompare.meta';
import { stepsMeta } from './steps.meta';

/** Todas as fichas registradas até agora (componentes + blocos). */
export const NEPHOS_COMPONENTS: NephosComponentMeta[] = [
  buttonMeta,
  inputTextMeta,
  floatLabelMeta,
  cardMeta,
  selectMeta,
  checkboxMeta,
  radioButtonMeta,
  passwordMeta,
  messageMeta,
  toastMeta,
  dialogMeta,
  tagMeta,
  loginFormBlockMeta,
  emptyStateBlockMeta,
  destructiveConfirmBlockMeta,
  searchFiltersBlockMeta,
  headerBlockMeta,
  sidebarBlockMeta,
  dataTableBlockMeta,
  // Templates (category: 'layout')
  appShellTemplateMeta,
  listingTemplateMeta,
  authTemplateMeta,
  detailFormTemplateMeta,
  dashboardTemplateMeta,
  // Onda 1 — átomos primitivos
  linkMeta,
  labelMeta,
  headingMeta,
  textMeta,
  helperTextMeta,
  iconMeta,
  // Onda 2 — componentes PrimeNG de alta frequência
  textareaMeta,
  toggleSwitchMeta,
  sliderMeta,
  dividerMeta,
  badgeMeta,
  skeletonMeta,
  progressBarMeta,
  imageMeta,
  progressSpinnerMeta,
  tooltipMeta,
  // Onda 4 — navegação
  breadcrumbMeta,
  tabsMeta,
  paginatorMeta,
  menuMeta,
  menubarMeta,
  // Onda 3 — entrada avançada
  datePickerMeta,
  fileUploadMeta,
  // Onda 2 (restante) + Onda 5 — destravados pela decisão Font Awesome
  avatarMeta,
  chipMeta,
  iconButtonMeta,
  searchInputMeta,
  logoMeta,
  themeToggleMeta,
  // Onda "Dados"
  dataTableMeta,
  dataViewMeta,
  // Onda "Formulário avançado"
  inputNumberMeta,
  autoCompleteMeta,
  multiSelectMeta,
  selectButtonMeta,
  toggleButtonMeta,
  inputMaskMeta,
  // Onda "Painéis/estrutura"
  accordionMeta,
  stepperMeta,
  toolbarMeta,
  // Onda "Sobreposições"
  confirmDialogMeta,
  drawerMeta,
  popoverMeta,
  // Onda "Catálogo completo" — menus
  contextMenuMeta,
  megaMenuMeta,
  tieredMenuMeta,
  panelMenuMeta,
  dockMeta,
  speedDialMeta,
  // Catálogo completo — dados / hierarquia
  treeMeta,
  treeTableMeta,
  treeSelectMeta,
  orderListMeta,
  pickListMeta,
  organizationChartMeta,
  timelineMeta,
  carouselMeta,
  galleriaMeta,
  // Catálogo completo — campos de seleção / entradas especiais
  cascadeSelectMeta,
  listboxMeta,
  ratingMeta,
  knobMeta,
  colorPickerMeta,
  inputOtpMeta,
  editorMeta,
  // Catálogo completo — painéis / estrutura
  panelMeta,
  fieldsetMeta,
  splitterMeta,
  scrollPanelMeta,
  inplaceMeta,
  // Catálogo completo — sobreposições / feedback
  confirmPopupMeta,
  dynamicDialogMeta,
  meterGroupMeta,
  blockUiMeta,
  scrollTopMeta,
  // Catálogo completo — composição / helpers
  inputGroupMeta,
  inputGroupAddonMeta,
  iftaLabelMeta,
  avatarGroupMeta,
  overlayBadgeMeta,
  // Catálogo completo — botões compostos
  splitButtonMeta,
  buttonGroupMeta,
  // Catálogo completo — nicho
  chartMeta,
  terminalMeta,
  imageCompareMeta,
  stepsMeta,
];

/** Só os blocos (composições nossas — category: 'block'). */
export const NEPHOS_BLOCKS: NephosComponentMeta[] =
  NEPHOS_COMPONENTS.filter((m) => m.identity.category === 'block');

/** Busca rápida por id (ex.: 'button'). */
export const NEPHOS_COMPONENTS_BY_ID: Record<string, NephosComponentMeta> =
  NEPHOS_COMPONENTS.reduce(
    (acc, meta) => {
      acc[meta.identity.id] = meta;
      return acc;
    },
    {} as Record<string, NephosComponentMeta>,
  );

export type { NephosComponentMeta };
