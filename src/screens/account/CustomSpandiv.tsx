import { FC } from "react"
type Custominputprops = {
  labeled: string;
  inputType: string;
  placeholder: string;
};


const CustomSpandiv :FC<Custominputprops> = ({labeled,inputType,placeholder}) => {
  return (
    <div style={{marginTop:'5%'}} className="bg-white border border-slate-200 rounded-lg p-2"><span className="font-bold p-3">{labeled}:</span><span>{placeholder}</span></div>
  )
}

export default CustomSpandiv