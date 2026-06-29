import { PageHeader, Row, Col, Spin } from "antd";
import { Main } from "@styles/auth-info-style";
import { useSalesOrderStatsQuery } from "@redux/services/dashboard/api";
import StatCard from "@components/cards/statistics/cards-statistics";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LineChartOutlined,
  RiseOutlined,
  FallOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  const { data: orderStatsRes, isLoading } = useSalesOrderStatsQuery();
  const stats = orderStatsRes?.data;

  return (
    <Main>
      <PageHeader
        ghost={false}
        title="Dashboard"
        subTitle="Overview of all metrics"
      >
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <h3 style={{ marginBottom: "16px" }}>All Time Metrics</h3>
            <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
              <Col xs={24} sm={12} xl={6}>
                <StatCard
                  title="Total Sales"
                  value={`৳${stats?.totalRevenue?.toLocaleString() || 0}`}
                  color="sky"
                  icon={<DollarOutlined />}
                  trend={<LineChartOutlined height={24} width={24} />}
                />
              </Col>
              <Col xs={24} sm={12} xl={6}>
                <StatCard
                  title="Total Orders"
                  value={stats?.totalOrder || 0}
                  color="orange"
                  icon={<ShoppingCartOutlined />}
                  trend={<BarChartOutlined height={24} width={24} />}
                />
              </Col>
              <Col xs={24} sm={12} xl={6}>
                <StatCard
                  title="Total Completed Orders"
                  value={stats?.totalCompletedOrder || 0}
                  color="green"
                  icon={<CheckCircleOutlined />}
                  trend={<RiseOutlined height={24} width={24} />}
                />
              </Col>
              <Col xs={24} sm={12} xl={6}>
                <StatCard
                  title="Total Pending Orders"
                  value={stats?.totalPendingOrder || 0}
                  color="red"
                  icon={<ClockCircleOutlined />}
                  trend={<FallOutlined height={24} width={24} />}
                />
              </Col>
            </Row>

            <h3 style={{ marginBottom: "16px" }}>{`Today's Metrics`}</h3>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} xl={6}>
                <StatCard
                  title="Today Sales"
                  value={`৳${stats?.todayRevenue?.toLocaleString() || 0}`}
                  color="sky"
                  icon={<DollarOutlined />}
                  trend={<LineChartOutlined height={24} width={24} />}
                />
              </Col>
              <Col xs={24} sm={12} xl={6}>
                <StatCard
                  title="Today Orders"
                  value={stats?.todayOrder || 0}
                  color="orange"
                  icon={<ShoppingCartOutlined />}
                  trend={<BarChartOutlined height={24} width={24} />}
                />
              </Col>
              <Col xs={24} sm={12} xl={6}>
                <StatCard
                  title="Today Completed Orders"
                  value={stats?.todayCompletedOrder || 0}
                  color="green"
                  icon={<CheckCircleOutlined />}
                  trend={<RiseOutlined height={24} width={24} />}
                />
              </Col>
              <Col xs={24} sm={12} xl={6}>
                <StatCard
                  title="Today Pending Orders"
                  value={stats?.todayPendingOrder || 0}
                  color="red"
                  icon={<ClockCircleOutlined />}
                  trend={<FallOutlined height={24} width={24} />}
                />
              </Col>
            </Row>
          </>
        )}
      </PageHeader>
    </Main>
  );
};

export default Dashboard;
