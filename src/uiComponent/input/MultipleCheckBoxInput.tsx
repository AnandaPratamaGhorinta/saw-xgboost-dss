import SimpleCheckBoxInput from "./SimpleCheckBoxInput";

interface LabelAndName {
  label: string;
  name: string;
}

interface MultipleSimpleCheckBoxInputProps {
  labelAndNameList: LabelAndName[];
}

export default function MultipleSimpleCheckBoxInput({
  labelAndNameList,
}: MultipleSimpleCheckBoxInputProps) {
  return (
    <>
      {labelAndNameList.map((it) => {
        return <SimpleCheckBoxInput name={it?.name} label={it?.label} />;
      })}
    </>
  );
}
