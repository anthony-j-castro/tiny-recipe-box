import React from "react";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 434 231"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <path d="M85.056 75.944c0 5.376-1.45 10.24-4.352 14.592-2.901 4.352-7.125 7.552-12.672 9.6L87.616 137H55.872l-15.616-32.128H29.76V137H1.472V48.936H55.36c6.315 0 11.69 1.237 16.128 3.712 4.523 2.39 7.893 5.675 10.112 9.856 2.304 4.096 3.456 8.576 3.456 13.44Zm-28.8 1.152c0-2.304-.768-4.224-2.304-5.76-1.536-1.536-3.413-2.304-5.632-2.304H29.76v16.256h18.56c2.219 0 4.096-.768 5.632-2.304 1.536-1.621 2.304-3.584 2.304-5.888Zm67.703-9.216c12.373 0 21.803 2.901 28.288 8.704 6.571 5.803 9.856 14.677 9.856 26.624v4.352h-50.688c0 4.864 1.067 8.533 3.2 11.008 2.219 2.475 5.675 3.712 10.368 3.712 4.267 0 7.381-.896 9.344-2.688 2.048-1.792 3.072-4.181 3.072-7.168h24.704c0 8.192-3.115 14.592-9.344 19.2-6.229 4.608-15.317 6.912-27.264 6.912-12.544 0-22.272-2.901-29.184-8.704-6.912-5.888-10.368-14.763-10.368-26.624 0-11.605 3.37-20.395 10.112-26.368 6.741-5.973 16.043-8.96 27.904-8.96Zm1.024 16.256c-8.021 0-12.501 3.797-13.44 11.392h24.832c0-3.499-1.024-6.272-3.072-8.32-1.963-2.048-4.736-3.072-8.32-3.072Zm77.311-16.256c11.093 0 20.053 2.39 26.88 7.168 6.912 4.693 10.368 11.904 10.368 21.632h-24.704c0-7.68-4.181-11.52-12.544-11.52s-12.544 4.821-12.544 14.464v7.296c0 9.557 4.352 14.336 13.056 14.336 8.704 0 13.056-3.925 13.056-11.776h23.68c0 9.813-3.456 17.109-10.368 21.888-6.827 4.779-15.787 7.168-26.88 7.168-11.861 0-21.163-2.987-27.904-8.96-6.741-5.973-10.112-14.763-10.112-26.368 0-11.605 3.371-20.395 10.112-26.368 6.741-5.973 16.043-8.96 27.904-8.96Zm44.287-6.4V44.2h25.472v17.28h-25.472Zm0 75.52V69.416h25.472V137h-25.472Zm79.233-69.12c9.131 0 16.171 2.987 21.12 8.96 4.949 5.973 7.424 14.805 7.424 26.496 0 11.605-2.475 20.395-7.424 26.368-4.949 5.888-11.989 8.832-21.12 8.832-7.851 0-14.165-2.56-18.944-7.68v31.36h-25.472v-92.8h20.736l2.176 9.6c4.949-7.424 12.117-11.136 21.504-11.136Zm-7.936 18.816c-3.755 0-6.571 1.323-8.448 3.968-1.877 2.645-2.816 6.101-2.816 10.368v4.224c0 4.267.939 7.765 2.816 10.496 1.877 2.645 4.693 3.968 8.448 3.968 7.339 0 11.008-4.395 11.008-13.184v-6.784c0-8.704-3.669-13.056-11.008-13.056Zm76.671-18.816c12.373 0 21.803 2.901 28.288 8.704 6.571 5.803 9.856 14.677 9.856 26.624v4.352h-50.688c0 4.864 1.067 8.533 3.2 11.008 2.219 2.475 5.675 3.712 10.368 3.712 4.267 0 7.381-.896 9.344-2.688 2.048-1.792 3.072-4.181 3.072-7.168h24.704c0 8.192-3.115 14.592-9.344 19.2-6.229 4.608-15.317 6.912-27.264 6.912-12.544 0-22.272-2.901-29.184-8.704-6.912-5.888-10.368-14.763-10.368-26.624 0-11.605 3.371-20.395 10.112-26.368 6.741-5.973 16.043-8.96 27.904-8.96Zm1.024 16.256c-8.021 0-12.501 3.797-13.44 11.392h24.832c0-3.499-1.024-6.272-3.072-8.32-1.963-2.048-4.736-3.072-8.32-3.072Zm-335.477 57.8c4.437 0 8.49.939 12.16 2.816 3.755 1.792 6.699 4.352 8.832 7.68 2.219 3.328 3.328 7.04 3.328 11.136 0 10.837-4.907 17.664-14.72 20.48v.512c11.179 2.56 16.768 9.899 16.768 22.016 0 4.608-1.152 8.704-3.456 12.288-2.219 3.499-5.29 6.229-9.216 8.192-3.925 1.963-8.235 2.944-12.928 2.944H1.472v-88.064h58.624ZM29.76 176.24h19.456c1.877 0 3.413-.64 4.608-1.92 1.28-1.365 1.92-3.029 1.92-4.992v-1.28c0-1.877-.64-3.456-1.92-4.736-1.28-1.365-2.816-2.048-4.608-2.048H29.76v14.976Zm0 33.28h21.504c1.877 0 3.413-.64 4.608-1.92 1.28-1.365 1.92-3.029 1.92-4.992v-1.28c0-1.963-.64-3.584-1.92-4.864-1.195-1.365-2.73-2.048-4.608-2.048H29.76v15.104Zm97.449-48.64c11.861 0 21.163 3.029 27.904 9.088 6.827 5.973 10.24 14.72 10.24 26.24 0 11.52-3.413 20.309-10.24 26.368-6.741 5.973-16.043 8.96-27.904 8.96s-21.163-2.987-27.904-8.96c-6.741-5.973-10.112-14.763-10.112-26.368 0-11.605 3.37-20.395 10.112-26.368 6.741-5.973 16.043-8.96 27.904-8.96Zm0 17.28c-8.363 0-12.544 4.821-12.544 14.464v7.296c0 9.557 4.181 14.336 12.544 14.336 8.448 0 12.672-4.779 12.672-14.336v-7.296c0-9.643-4.224-14.464-12.672-14.464ZM243.156 230H213.46l-12.8-21.248h-.512L187.22 230h-28.288l25.984-35.84-23.424-31.744h29.952l10.752 17.92h.512l10.752-17.92h28.16L217.812 194.8l25.344 35.2ZM19.776 10.656v6.48H14.4v9.648c0 1.152.192 2 .576 2.544.384.512 1.088.768 2.112.768h2.688v5.616c-.768.256-1.76.464-2.976.624-1.216.16-2.272.24-3.168.24-2.816 0-4.992-.512-6.528-1.536-1.504-1.024-2.256-2.768-2.256-5.232V17.136H1.296v-6.48h3.936l2.064-7.68H14.4v7.68h5.376Zm2.128-2.976V1.2h9.552v6.48h-9.552Zm0 28.32V10.656h9.552V36h-9.552Zm30.48-25.92c2.944 0 5.152.816 6.624 2.448 1.472 1.632 2.209 3.984 2.209 7.056V36h-9.553V20.736c0-1.088-.288-1.952-.864-2.592-.543-.672-1.328-1.008-2.351-1.008-1.184 0-2.145.384-2.88 1.152-.736.768-1.105 1.712-1.105 2.832V36h-9.551V10.656h7.824l.623 3.84c.992-1.344 2.288-2.416 3.889-3.216 1.631-.8 3.343-1.2 5.136-1.2Zm29.328 25.152c-1.312 3.552-2.928 6.24-4.848 8.064-1.888 1.856-4.544 2.784-7.968 2.784-2.08 0-3.92-.288-5.52-.864v-5.712h3.84c2.4 0 3.824-1.168 4.272-3.504l-10.08-25.344H71.68l4.848 16.848h.336l4.464-16.848h9.408l-9.024 24.576Z" />
      </g>
    </svg>
  );
};

export default Logo;
