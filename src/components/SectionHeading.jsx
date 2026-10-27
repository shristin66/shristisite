const SectionHeading = ({ heading, content }) => (
  <div className="mb-6 text-center sm:mb-8">
    <h2 className="text-3xl font-medium tracking-tighter">{heading}</h2>
    {content && <p className="text-muted-foreground mt-2 text-sm">{content}</p>}
  </div>
);

export default SectionHeading;
