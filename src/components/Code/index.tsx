export const Code: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <code className="bg-slate-800 text-white rounded-xl p-4">{children}</code>
  );
};
