import React, { ReactNode } from "react";
import {
  StyledCard,
  DecorativeCircle,
  IconContainer,
  InnerIcon,
  ContentWrapper,
  Title,
  ValueRow,
  Value,
  Growth,
} from "./style";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    trend?: ReactNode;
    color: "sky" | "orange" | "green" | "red";
}

const themeMap = {
    sky: {
        bg: "#e6f7ff",
        title: "#0050b3",
        circle: "#bae7ff",
        ring: "#e6f7ff",
        border: "#1890ff",
        iconBg: "#1890ff"
    },
    orange: {
        bg: "#fff7e6",
        title: "#d4380d",
        circle: "#ffd8bf",
        ring: "#fff7e6",
        border: "#fa8c16",
        iconBg: "#fa8c16"
    },
    green: {
        bg: "#f6ffed",
        title: "#237804",
        circle: "#d9f7be",
        ring: "#f6ffed",
        border: "#52c41a",
        iconBg: "#52c41a"
    },
    red: {
        bg: "#fff1f0",
        title: "#a8071a",
        circle: "#ffccc7",
        ring: "#fff1f0",
        border: "#f5222d",
        iconBg: "#f5222d"
    }
};

export default function StatCard({
  title,
  value,
  icon,
  trend,
  color,
}: StatCardProps) {
  const theme = themeMap[color] || themeMap.sky;
  
  return (
    <StyledCard bordered={false} style={{ backgroundColor: theme.bg }}>
      <DecorativeCircle $circleColor={theme.circle} $ringColor={theme.ring} />
      
      <IconContainer $borderColor={theme.border}>
        <InnerIcon $bg={theme.iconBg}>
          {icon}
        </InnerIcon>
      </IconContainer>

      <ContentWrapper>
        <Title $color={theme.title}>{title}</Title>
        <ValueRow>
          <Value>{value}</Value>
          {trend && (
            <Growth $color={theme.border}>{trend}</Growth>
          )}
        </ValueRow>
      </ContentWrapper>
    </StyledCard>
  );
}
