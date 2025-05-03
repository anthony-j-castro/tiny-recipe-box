import { useState } from "react";
import {
  Agreement,
  ButtonsRow,
  Paragraph,
} from "~/client/components/AgreementRequired/styled";
import Button from "~/client/components/Button";
import Checkbox from "~/client/components/Checkbox";
import Interstitial from "~/client/components/Interstitial";
import { useUserAgreed } from "~/client/storage";

interface Props {
  children: React.ReactNode;
}

const AgreementRequired = ({ children }: Props) => {
  const [userAgreed, setUserAgreed] = useUserAgreed();
  const [isChecked, setIsChecked] = useState(false);

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
          <Checkbox
            data-testid="agreement-checkbox"
            isSelected={isChecked}
            onChange={setIsChecked}
          />{" "}
          I understand and accept the risk
        </Agreement>
        <ButtonsRow>
          <Button
            data-testid="agreement-submit"
            isDisabled={isChecked !== true}
            onPress={() => {
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
