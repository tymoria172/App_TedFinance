// components/Pagination.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

type Props = {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 12 }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <TouchableOpacity
                    key={page}
                    onPress={() => onPageChange(page)}
                    style={{
                        padding: 8,
                        backgroundColor: currentPage === page ? '#f60' : '#eee',
                        borderRadius: 4,
                        marginHorizontal: 4,
                    }}
                >
                    <Text style={{ color: currentPage === page ? '#fff' : '#000' }}>{page}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};
