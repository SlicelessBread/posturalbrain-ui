import { Button, Frame, LoginDivider, LoginForm, LoginScreen, TextField } from '../src';

export const card = { group: 'Accesso', height: 660, subtitle: 'Password e Face ID' };

// The preview is static markup: keep the form from leaving the card when "Entra" is tapped.
export const script = `
  // Demo only: an app handles the submit itself.
  document.querySelector('.pb-login__form').addEventListener('submit', (event) => event.preventDefault());
`;

export default function Example() {
  return (
    <Frame style={{ minHeight: '620px' }}>
      <LoginScreen title="PosturalBrain" subtitle="Entra per vedere pazienti, percorsi e scadenze.">
        <LoginForm>
          {/* A sample value, so the card shows a filled field. */}
          <TextField label="Password" type="password" defaultValue="pianoforte-verde" autoComplete="current-password" />
          <Button type="submit" variant="primary" block>Entra</Button>
          <LoginDivider />
          <Button block icon="scan-face">Entra con Face ID</Button>
        </LoginForm>
      </LoginScreen>
    </Frame>
  );
}
