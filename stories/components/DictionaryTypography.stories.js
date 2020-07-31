import React from "react";
import DictionaryTypography, {
  variants,
} from "components/DictionaryTypography";

export const Basic = () =>
  variants.map((variant) => (
    <DictionaryTypography key={variant} variant={variant}>
      {variant} Test Text
    </DictionaryTypography>
  ));

export default {
  title: "DictionaryTypography",
  component: DictionaryTypography,
};
