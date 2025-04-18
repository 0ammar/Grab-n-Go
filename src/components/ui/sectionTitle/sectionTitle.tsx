import './sectionTitle.scss';

type SectionTitleProps = {
  text: string;
  className?: string;
};

const SectionTitle = ({ text, className = '' }: SectionTitleProps) => {
  return (
    <div className={`section-title-wrapper ${className}`}>
      <span className="line" />
      <h1 className="section-title">{text}</h1>
      <span className="line" />
    </div>
  );
};

export default SectionTitle;
