import type { Configuration } from 'lint-staged';

const lintStagedConfig: Configuration = {
  '**/*.json': (stagedFiles) => `prettier --check ${stagedFiles.join(' ')}`,

  '**/*.scss': (stagedFiles) => `stylelint ${stagedFiles.join(' ')}`,

  '**/*.ts': (stagedFiles) => [
    `prettier --check ${stagedFiles.join(' ')}`,
    `eslint ${stagedFiles.join(' ')}`,
  ],
};

export default lintStagedConfig;
