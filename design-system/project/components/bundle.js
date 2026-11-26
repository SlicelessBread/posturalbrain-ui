/* @ds-bundle: {"format":4,"namespace":"PosturalBrain","components":[]} */
// The Design System page runs a preview live (its own script, the theme menu) only when this file
// exists; without it every preview is shown as a still picture. It exports nothing on purpose:
// the previews are markup rendered ahead of time from examples/*.tsx, and the React components
// are the posturalbrain-ui package, not this script.
window.PosturalBrain = window.PosturalBrain || {};
