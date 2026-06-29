import { ReactNode } from "react";
import styled from "styled-components";
import { Card } from "antd";

export const StyledCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  border: none;

  .ant-card-body {
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const DecorativeCircle = styled.div<{ $circleColor: string, $ringColor: string }>`
  position: absolute;
  top: -30px;
  right: -30px;
  height: 110px;
  width: 110px;
  border-radius: 50%;
  background-color: ${({ $circleColor }) => $circleColor};
  box-shadow: 0 0 0 20px ${({ $ringColor }) => $ringColor};
  opacity: 0.5;
`;

export const IconContainer = styled.div<{ $borderColor: string, children?: ReactNode }>`
  position: relative;
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px dashed ${({ $borderColor }) => $borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

export const InnerIcon = styled.div<{ $bg: string, children?: ReactNode }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
`;

export const Title = styled.p<{ $color: string, children?: ReactNode }>`
  margin-bottom: 8px;
  color: ${({ $color }) => $color};
  font-size: 16px;
  font-weight: 500;
`;

export const ValueRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Value = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
`;

export const Growth = styled.span<{ $color: string, children?: ReactNode }>`
  display: flex;
  align-items: center;
  color: ${({ $color }) => $color};
  font-weight: 600;
  font-size: 16px;
`;
