import { useCheckboxStore } from "@ariakit/react";
import React from "react";
import {
  Agreement,
  ButtonsRow,
  Checkbox,
  Paragraph,
} from "~/client/components/AgreementRequired/styled";
import Button from "~/client/components/Button";
import Interstitial from "~/client/components/Interstitial";
import { useUserAgreed } from "~/client/storage";

interface Props {
  children: React.ReactNode;
}

const AgreementRequired = ({ children }: Props) => {
  const [userAgreed, setUserAgreed] = useUserAgreed();
  const checkbox = useCheckboxStore({ defaultValue: false });
  const { value: isChecked } = checkbox.useState();

  if (userAgreed === false) {
    return (
      <Interstitial>
        <Paragraph>Welcome to Tiny Recipe Box!</Paragraph>
        <Paragraph>
          This site is still in development and no existing functionality is
          guaranteed to work when a new version is released. Use this site at
          your own risk.
        </Paragraph>
        <Agreement>
          <Checkbox store={checkbox} /> I understand and accept the risk
        </Agreement>
        <ButtonsRow>
          <Button
            disabled={isChecked !== true}
            onClick={() => {
              setUserAgreed(true);
            }}
          >
            Enter
          </Button>
        </ButtonsRow>
      </Interstitial>
    );
  }

  return children;
};

export default AgreementRequired;
