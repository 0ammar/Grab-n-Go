import './scrollHint.scss';

const ScrollHint = () => (
  <div className="scroll-hint-wrapper">
    <h5 className="scroll-label-fixed">JUST SCROLL DOWN</h5>
    <div className="scroll-track">
      <div className="scroll-line left" />
      <div className="scroll-line right" />
    </div>
  </div>
);

export default ScrollHint;