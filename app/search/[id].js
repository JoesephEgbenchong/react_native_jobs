import React from 'react'
import { useState, useEffect } from 'react'

import { ActivityIndicator, FlatList, Image, TouchableOpacity, View, Text, SafeAreaView } from 'react-native'
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'

import axios from 'axios'

import { ScreenHeaderBtn, NearbyJobCard } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
//probable styles to be imported

import {RAPID_API_KEY} from '@env';

const rapidApiKey = RAPID_API_KEY;

const JobSearch = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);

  const handleSearch = async() => {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        headers : {
          "X-RapidAPI-key": rapidApiKey,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: {
          query: params.id,
          page: page.toString(),
        },
      };

      const response = await axios.request(options);
      setSearchResult(response.data.data);
    } catch (error) {
      setSearchResult(error);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  };

  const handlePagination = (direction) => {
    if (direction === 'left' && page > 1) {
      setPage(page - 1)
      handleSearch()
    } else if (direction === 'right') {
        setPage(page + 1)
        handleSearch()
    }
  }

  useEffect(() => {
    handleSearch()
  }, [])
  

  return (
    <SafeAreaView style={{ flex:1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn 
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: ""
        }} 
      />

      
    </SafeAreaView>
  )
}

export default JobSearch