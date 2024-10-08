package com.HanaMini.repository;

import com.HanaMini.DTO.dashboard.GiftBoxesByStatusDTO;
import com.HanaMini.entity.GiftBox;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GiftBoxRepository extends JpaRepository<GiftBox, String> {
  Long countBySenderId(String senderId);
  Long countByReceiverId(String receiverId);
  List<GiftBox> findByReceiverId(String receiverId); // 받은 선물

  List<GiftBox> findBySenderId(String senderId); // 보낸 선물
  Long countBySenderIdNotNull();
  Long countByReceiverIdNotNull();
  // 가장 큰 giftId를 찾는 쿼리
  @Query("SELECT MAX(g.giftId) FROM GiftBox g")
  String findMaxGiftId();

  Optional<GiftBox> findByInsuranceContractContractId(String contractId);

  @Query("SELECT new com.HanaMini.DTO.dashboard.GiftBoxesByStatusDTO(g.registrationStatus, COUNT(g)) " +
      "FROM GiftBox g GROUP BY g.registrationStatus")
  List<GiftBoxesByStatusDTO> findGiftBoxesByStatus();
}
