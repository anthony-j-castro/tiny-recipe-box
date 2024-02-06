import styled from "styled-components";

export const Dot = styled.span<{ $status: boolean | null }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) =>
    props.$status === null ? "gray" : props.$status ? "green" : "red"};
  margin-left: 8px;
`;
