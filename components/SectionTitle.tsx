type SectionTitleProps = {
  title: string;
  subtitle: string;
};

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-4xl font-extrabold text-gray-900">
        {title}
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
        {subtitle}
      </p>
    </div>
  );
}