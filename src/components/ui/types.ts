import type { TemplateKey } from '@/helpers/types'

export type ButtonsProps = {
  onAddRow: () => void;
  onClearAll: () => void;
  onDownload: () => void;
};

export type ErrorMessageProps = {
  error?: string;
};

export type NavigationTabProps = {
  value: TemplateKey;
  onChange: (tab: TemplateKey) => void;
};