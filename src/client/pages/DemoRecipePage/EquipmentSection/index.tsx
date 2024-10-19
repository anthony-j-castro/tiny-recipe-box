import { sentenceCase } from "change-case";
import SectionHeading from "~/client/pages/DemoRecipePage/SectionHeading";
import { Item, ItemsList, Section } from "./styled";

type Props = {
  equipment: Array<{ id: string; item: string }>;
};

const EquipmentPanel = ({ equipment }: Props) => (
  <Section>
    <SectionHeading>Equipment</SectionHeading>
    <ItemsList>
      {equipment.map((item) => (
        <Item key={item.id}>{sentenceCase(item.item)}</Item>
      ))}
    </ItemsList>
  </Section>
);

export default EquipmentPanel;
