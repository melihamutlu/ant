// Card.tsx 
import React, { useEffect, useRef, useState } from 'react';
import { Layout, Menu, Breadcrumb, Divider, Row, Col, Space, Button, Tour, TourStepProps } from 'antd';
import '../App.css';
import { Content, Footer, Header } from 'antd/es/layout/layout';


interface Course {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: 'Web Geliştirme',
    description: 'Temel web geliştirme becerileri',
    imageUrl: '/img/web.jpg',
  },
  {
    id: 2,
    title: 'Veri Bilimi',
    description: 'Veri analizi ve yapay zeka',
    imageUrl: '/img/data.jpg',
  },
  {
    id: 3,
    title: 'Grafik Tasarım',
    description: 'Tasarım ilkeleri',
    imageUrl: '/img/graphic.jpg',
  },
  {
    id: 4,
    title: 'Sosyal Medya',
    description: 'Medya algoritmaları',
    imageUrl: '/img/social.jpg',
  },
];

const CardComponent: React.FC = () => {
  const [refs, setRefs] = useState<{[key: number]: React.RefObject<HTMLButtonElement> }>({});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [tourVisible, setTourVisible] = useState<boolean>(false);

  const steps: TourStepProps[] = [
    {
      title: 'Katıl',
      description: 'Eğitimi hemen izlemek için "katıl" butonuna tıklayınız.',
      target: refs[1]?.current,
    },
    {
      title: 'Kaydet',
      description: 'Eğitimi sonrasında izlemek için kaydedebilirsiniz !',
      target: refs[1]?.current,
    },

  ];

  const handleExploreClick = (_courseId: number) => {
    setTourVisible(true);
    setCurrentStep(0);
  };

  const handleStepChange = (current: number) => {
    setCurrentStep(current);
  };


  useEffect(() => {
    const newRefs: { [key: number]: React.RefObject<HTMLButtonElement> } = {};
    courses.forEach(course => {
      newRefs[course.id] = React.createRef();
    });
    setRefs(newRefs);
  }, []);



  return (
    <Layout className='layout'>
      <Header>
        <div className='logo' />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Ana Sayfa</Menu.Item>
          <Menu.Item key="2">Kurslar</Menu.Item>
          <Menu.Item key="3">Profilim</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Ana Sayfa</Breadcrumb.Item>
        </Breadcrumb>
        <Divider orientation="left">Kurslar</Divider>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {courses.map(course => (
            <Col key={course.id} className="gutter-row" xs={24} sm={12} md={8} lg={8}>
              <div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <img src={course.imageUrl} alt={course.title} style={{ maxWidth: '100%' }} />
              </div>
              <Space>
                {course.id === 1 ? (
                  <>
                    <Button onClick={() => console.log('Katıl clicked')} ref={refs[course.id]}>
                      Katıl
                    </Button>
                    <Button onClick={() => console.log('Kaydet clicked')} ref={refs[course.id]}>
                      Kaydet
                    </Button>
                    <Button type="primary" onClick={() => handleExploreClick(course.id)}>
                      Keşfet
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => console.log('Katıl clicked')} ref={refs[course.id]}>
                      Katıl
                    </Button>
                    <Button onClick={() => console.log('Kaydet clicked')} ref={refs[course.id]}>
                      Kaydet
                    </Button>
                  </>
                )}
              </Space>
              {tourVisible && course.id === 1 && (
                <Tour
                  open={tourVisible}
                  steps={steps}
                  onChange={handleStepChange}
                  mask={false}
                  onClose={() => setTourVisible(false)}
                />
              )}
            </Col>
          ))}
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}> <h3>EDUCATION CENTER</h3></Footer>
    </Layout>
  );
};

export default CardComponent;
