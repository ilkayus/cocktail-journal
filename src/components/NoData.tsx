const NoData = ({ setNoData }: any) => {
  return (
    <div className="no--data--conteiner" onClick={() => setNoData(false)}>
      <h3>Could not find anything!</h3>
    </div>
  );
};

export default NoData;
