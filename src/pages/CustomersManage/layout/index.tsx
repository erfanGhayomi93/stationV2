const CustomersMangeLayout = ({ children }: { children: React.ReactNode }) => {
     return <div className="rtl grid h-full grid-cols-[2fr_1fr] gap-x-2 overflow-hidden">{children}</div>;
};

export default CustomersMangeLayout;
