import React from 'react';
import Table from '@/components/table';
import useUserList from '@/hooks/use-user';
const Home: React.FC = () => {
  const [filterOptions, setFilterOptions] = React.useState({
    utilityType: 'all',
    typing: ''
  });
  const { data, isLoading }: any = useUserList();
  const handleSearch = (typing: any) => {
    setFilterOptions({
      ...filterOptions,
      typing
    });
  };
  const keys = ['username', 'email'];
  const getData = () => {
    return data?.filter((item: any) => {
      return keys.some((key: string) => {
        return item[key]
          .toLowerCase()
          .includes(filterOptions.typing.toLowerCase());
      });
    });
  };

  const renderTable = () => {
    const premises = getData();
    const headerResolver = (h: any) => {
      const result = { ...h };
      return result;
    };
    const uSaveListResolver = (d: any) => {
      const result = { ...d };

      return result;
    };
    return (
      <Table
        itemsPerpage={5}
        loading={isLoading}
        handleSearch={handleSearch}
        itemResolver={uSaveListResolver}
        headerResolver={headerResolver}
        data={premises}
        config={{
          sortables: {
            id: true
          }
        }}
      />
    );
  };

  return (
    <div className="row home">
      <div className="container">{renderTable()}</div>
    </div>
  );
};

export default Home;
