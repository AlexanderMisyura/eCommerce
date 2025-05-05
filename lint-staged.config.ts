import type { Configuration } from 'lint-staged';

const lintStagedConfig: Configuration = {
  '**/*.json': (stagedFiles) => `prettier --check ${stagedFiles.join(' ')}`,

  '**/*.{css,scss}': (stagedFiles) => `stylelint ${stagedFiles.join(' ')}`,

  '**/*.{ts,tsx}': (stagedFiles) => [
    `prettier --check ${stagedFiles.join(' ')}`,
    `eslint ${stagedFiles.join(' ')}`,
  ],
};

export default lintStagedConfig;
