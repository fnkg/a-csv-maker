import type { ErrorMessageProps } from './types'

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;
  return <h3 className="text-red-500 text-sm mb-4 absolute top-9 left-21">{error}</h3>;
}

export default ErrorMessage;
