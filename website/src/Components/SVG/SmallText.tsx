const SmallText = (props:SmallText) => {
  return (
    <svg
      {...props}
      id="smallText"
      width={704 * props.scale}
      height={105 * props.scale}
      viewBox="0 0 704 105"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className="logoText" d="M703.117 103H677.031L661.352 77.0547C660.18 75.0859 659.055 73.3281 657.977 71.7812C656.898 70.2344 655.797 68.9219 654.672 67.8438C653.594 66.7188 652.445 65.875 651.227 65.3125C650.055 64.7031 648.766 64.3984 647.359 64.3984H641.242V103H618.531V2.17188H654.531C679 2.17188 691.234 11.3125 691.234 29.5938C691.234 33.1094 690.695 36.3672 689.617 39.3672C688.539 42.3203 687.016 44.9922 685.047 47.3828C683.078 49.7734 680.688 51.8359 677.875 53.5703C675.109 55.3047 672.016 56.6641 668.594 57.6484V57.9297C670.094 58.3984 671.547 59.1719 672.953 60.25C674.359 61.2812 675.719 62.5 677.031 63.9062C678.344 65.3125 679.586 66.8359 680.758 68.4766C681.977 70.0703 683.078 71.6406 684.062 73.1875L703.117 103ZM641.242 19.1875V47.2422H651.086C655.961 47.2422 659.875 45.8359 662.828 43.0234C665.828 40.1641 667.328 36.625 667.328 32.4062C667.328 23.5938 662.055 19.1875 651.508 19.1875H641.242Z" />
      <path className="logoText" d="M608.727 59.3359C608.727 89.6172 594.617 104.758 566.398 104.758C539.023 104.758 525.336 89.9688 525.336 60.3906V2.17188H548.117V60.6719C548.117 76.9844 554.492 85.1406 567.242 85.1406C579.758 85.1406 586.016 77.2656 586.016 61.5156V2.17188H608.727V59.3359Z" />
      <path className="logoText" d="M459.141 104.758C444.703 104.758 432.938 100.07 423.844 90.6953C414.75 81.2734 410.203 69.0156 410.203 53.9219C410.203 37.9844 414.82 25.0938 424.055 15.25C433.289 5.40625 445.523 0.484375 460.758 0.484375C475.148 0.484375 486.773 5.19531 495.633 14.6172C504.539 24.0391 508.992 36.4609 508.992 51.8828C508.992 67.7266 504.375 80.5 495.141 90.2031C485.953 99.9062 473.953 104.758 459.141 104.758ZM460.125 20.0312C452.156 20.0312 445.828 23.0312 441.141 29.0312C436.453 34.9844 434.109 42.8828 434.109 52.7266C434.109 62.7109 436.453 70.6094 441.141 76.4219C445.828 82.2344 451.969 85.1406 459.562 85.1406C467.391 85.1406 473.602 82.3281 478.195 76.7031C482.789 71.0312 485.086 63.1797 485.086 53.1484C485.086 42.6953 482.859 34.5625 478.406 28.75C473.953 22.9375 467.859 20.0312 460.125 20.0312Z" />
      <path className="logoText" d="M406.336 20.6641H377.578V103H354.797V20.6641H326.18V2.17188H406.336V20.6641Z" />
      <path className="logoText" d="M312.422 103H289.992V42.6719C289.992 36.1562 290.273 28.9609 290.836 21.0859H290.273C289.102 27.2734 288.047 31.7266 287.109 34.4453L263.484 103H244.922L220.875 35.1484C220.219 33.3203 219.164 28.6328 217.711 21.0859H217.078C217.688 31.0234 217.992 39.7422 217.992 47.2422V103H197.531V2.17188H230.789L251.391 61.9375C253.031 66.7188 254.227 71.5234 254.977 76.3516H255.398C256.664 70.7734 258 65.9219 259.406 61.7969L280.008 2.17188H312.422V103Z" />
      <path className="logoText" d="M185.539 2.17188L152.703 67.1406V103H129.992V67.5625L98 2.17188H123.945L140.188 39.7891C140.469 40.4922 141.242 43.2344 142.508 48.0156H142.789C143.398 44.6406 144.125 41.9922 144.969 40.0703L161.492 2.17188H185.539Z" />
      <path className="logoText" d="M89.2891 96.25C79.4453 101.922 67.2109 104.758 52.5859 104.758C36.3672 104.758 23.5703 100.281 14.1953 91.3281C4.86719 82.3281 0.203125 69.9531 0.203125 54.2031C0.203125 38.3594 5.3125 25.4453 15.5312 15.4609C25.75 5.47656 39.3438 0.484375 56.3125 0.484375C67 0.484375 76.4219 1.96094 84.5781 4.91406V26.2188C76.7969 21.7188 67.2812 19.4688 56.0312 19.4688C46.6094 19.4688 38.9219 22.5391 32.9688 28.6797C27.0625 34.7734 24.1094 42.9297 24.1094 53.1484C24.1094 63.5078 26.7578 71.5234 32.0547 77.1953C37.3984 82.8672 44.5938 85.7031 53.6406 85.7031C59.0781 85.7031 63.3906 84.9297 66.5781 83.3828V63.6953H46.3984V45.5547H89.2891V96.25Z" />
    </svg>
  );
};

export { SmallText };
