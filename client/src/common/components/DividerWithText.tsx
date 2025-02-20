const DividerWithText = (props: A) => {
  const { children, ...rest } = props;

  return (
    <div className="mb-6 border-b text-center" {...rest}>
      <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
        {children}
      </div>
    </div>
  );
};

export default DividerWithText;
