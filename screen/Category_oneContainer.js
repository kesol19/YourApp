import React from 'react';
import { View, Text ,Button} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

export default function Category_oneContainer({navigation}){
    return(
        <View>
            <Text>category_one screen</Text>
        </View>
    );
}

/*
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Category_oneContainer = ({ route }) => {
  const { productId, category } = route.params;

  const getProductDetail = (productId) => {
    // productId와 category를 기반으로 상세 정보를 가져오는 로직을 구현
    // 예시로 간단하게 카테고리가 1인 경우에만 상세 정보를 보여주도록 함
    if (category === 1) {
      switch (productId) {
        case 1:
          return '상품 A의 상세 정보';
        case 2:
          return '상품 B의 상세 정보';
        case 3:
          return '상품 C의 상세 정보';
        default:
          return '상세 정보 없음';
      }
    } else {
      return '해당 카테고리의 상세 정보가 없습니다.';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Detail</Text>
      <Text style={styles.category}>Category: {category}</Text>
      <Text style={styles.detail}>{getProductDetail(productId)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  category: {
    fontSize: 18,
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
  },
});

export default Category_oneContainer;
*/