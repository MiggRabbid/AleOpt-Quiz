import clsx from 'clsx';
import { CSSProperties } from 'react';

interface ISideMainProps {
  children: React.ReactNode;
  otherClass?: string;
  style?: CSSProperties;
}

const SideMain = ({ otherClass, style, children }: ISideMainProps) => {
  const className = clsx(
    `shadow-glass border-glass relative flex h-full w-full rounded-2xl border backdrop-blur-sm`,
    otherClass,
  );
  return (
    <div className={className} data-side-type="SideMain" style={style}>
      <div className="bg-glass h-full w-full rounded-2xl p-3.5">{children}</div>
    </div>
  );
};

export { SideMain };
