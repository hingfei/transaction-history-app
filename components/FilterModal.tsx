import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";

type FilterOptionProps = {
    label: string;
    isSelected: boolean;
    onPress: () => void;
};

const FilterModal = ({
    filterModalVisible,
    setFilterModalVisible,
    filterType,
    handleFilter,
}: {
    filterModalVisible: boolean;
    setFilterModalVisible: (visible: boolean) => void;
    filterType: "debit" | "credit" | undefined;
    handleFilter: (type: "debit" | "credit" | undefined) => void;
}) => {
    const options: { label: string; value: "debit" | "credit" | undefined }[] = [
        { label: "All", value: undefined },
        { label: "Debit", value: "debit" },
        { label: "Credit", value: "credit" },
    ];

    return (
        <Modal
            visible={filterModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setFilterModalVisible(false)}
        >
            <TouchableOpacity
                className="flex-1"
                onPress={() => setFilterModalVisible(false)}
                activeOpacity={1}
            >
                <View className={"flex-1 justify-end"}>
                    <View className={"bg-white p-4 pb-10 rounded-t-lg shadow-lg"}>
                        <ThemedText type="title" className={"mb-4 text-center"}>
                            Filter Transactions
                        </ThemedText>
                        {options.map((option) => (
                            <FilterOption
                                key={option.label}
                                label={option.label}
                                isSelected={filterType === option.value}
                                onPress={() => handleFilter(option.value)}
                            />
                        ))}
                        <TouchableOpacity
                            onPress={() => setFilterModalVisible(false)}
                            className={"p-2.5 bg-secondary rounded-lg"}
                        >
                            <ThemedText className="text-white text-center">Close</ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const FilterOption = ({ label, isSelected, onPress }: FilterOptionProps) => (
    <TouchableOpacity onPress={onPress} className={"p-2.5 mb-2"}>
        <ThemedText className={`text-center ${isSelected && "text-primary font-bold"}`}>
            {label}
            {isSelected ? " (Selected)" : ""}
        </ThemedText>
    </TouchableOpacity>
);

export default FilterModal;
