import { Panel, PanelHeaderTemplateOptions } from "primereact/panel";
import { Ripple } from "primereact/ripple";
import { FC } from "react";
import { CustomMessageProps } from "../interfaces/type";

const CustomPanel: FC<CustomMessageProps> = ({ content, title }) => {
  const template = (options: PanelHeaderTemplateOptions) => {
    const toggleIcon = options.collapsed
      ? "pi pi-chevron-down"
      : "pi pi-chevron-up";
    const className = `${options.className} justify-content-start`;
    const style = { fontSize: "1.25rem" };

    return (
      <div className={className}>
        <button
          className={options.togglerClassName}
          onClick={options.onTogglerClick}
        >
          <span className={toggleIcon}></span>
          <Ripple />
        </button>
        <span className={`text-stone-80`} style={style}>
          {title}
        </span>
      </div>
    );
  };

  return (
    <Panel headerTemplate={template} toggleable collapsed={true}>
      <p className="m-0">{content}</p>
    </Panel>
  );
};

export default CustomPanel;
