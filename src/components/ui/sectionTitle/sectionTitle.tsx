import './sectionTitle.scss';

type SectionTitleProps = {
  text: string;
  className?: string;
};

const SectionTitle = ({ text, className = '' }: SectionTitleProps) => {
  return (
    <div className={`section-title-wrapper ${className}`}>
      <span className="line" />
      <h2 className="section-title">{text}</h2>
      <span className="line" />
    </div>
  );
};

export default SectionTitle;
