import { Checkbox, Radio, Typography, Divider } from "antd";
const { Title } = Typography;
export default () => {
  return (
    <div
      style={{
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20
      }}
    >
      <img
        src={"../assets/images/no_data.svg"}
        style={{
          height: 50,
        }}
      />
      <Title level={5} style={{ opacity: 0.5, marginTop: 10 }}>
        No Data
      </Title>
    </div>
  );
};
