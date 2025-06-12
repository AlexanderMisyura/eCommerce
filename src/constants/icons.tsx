import GithubLogo from '@assets/icons/github-logo.svg';
import RSSchoolLogo from '@assets/icons/rs-logo.svg';
import CommerceToolsLogo from '@assets/icons/technologies/commercetools-logo.svg';
import ESLintLogo from '@assets/icons/technologies/eslint-logo.svg';
import GitLogo from '@assets/icons/technologies/git-logo.svg';
import MuiLogo from '@assets/icons/technologies/mui-logo.svg';
import PrettierLogo from '@assets/icons/technologies/prettier-logo.svg';
import ReactLogo from '@assets/icons/technologies/react-logo.svg';
import ReactRouterLogo from '@assets/icons/technologies/react-router-logo.svg';
import TypeScriptLogo from '@assets/icons/technologies/ts-logo.svg';
import ViteLogo from '@assets/icons/technologies/vite-logo.svg';
import ZodLogo from '@assets/icons/technologies/zod-logo.svg';
import type { ComponentType, ReactElement, SVGProps } from 'react';

export type SvgLogoItem = (props: React.SVGAttributes<SVGElement>) => ReactElement;

const DEFAULT_SIZE = 20;

const createSvgLogo =
  (Component: ComponentType<SVGProps<SVGSVGElement>>): SvgLogoItem =>
  (props) => <Component width={DEFAULT_SIZE} height={DEFAULT_SIZE} {...props} />;

export const SVG_LOGO = {
  react: createSvgLogo(ReactLogo),
  typeScript: createSvgLogo(TypeScriptLogo),
  reactRouter: createSvgLogo(ReactRouterLogo),
  vite: createSvgLogo(ViteLogo),
  mui: createSvgLogo(MuiLogo),
  zod: createSvgLogo(ZodLogo),
  git: createSvgLogo(GitLogo),
  commercetools: createSvgLogo(CommerceToolsLogo),
  eslint: createSvgLogo(ESLintLogo),
  prettier: createSvgLogo(PrettierLogo),
  rsSchool: createSvgLogo(RSSchoolLogo),
  github: createSvgLogo(GithubLogo),
} as const;
